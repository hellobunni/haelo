import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe/server";
import { syncStripeInvoiceToSupabase } from "@/lib/stripe/sync";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET environment variable");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret,
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = await createClient();

  try {
    console.log(`📨 Received webhook: ${event.type}`);
    console.log(`📋 Event data:`, {
      id: event.id,
      type: event.type,
      created: new Date(event.created * 1000).toISOString(),
    });

    // Handle different event types
    switch (event.type) {
      // Invoice events
      case "invoice.created":
      case "invoice.updated":
      case "invoice.finalized":
      case "invoice.sent": {
        const invoice = event.data.object as Stripe.Invoice;
        console.log(`🔄 Processing ${event.type} for invoice ${invoice.id}`);
        console.log(`📦 Stripe invoice data from webhook:`, {
          id: invoice.id,
          number: invoice.number,
          status: invoice.status,
          amount_due: invoice.amount_due / 100,
          amount_paid: invoice.amount_paid / 100,
          currency: invoice.currency,
          customer:
            typeof invoice.customer === "string"
              ? invoice.customer
              : invoice.customer?.id,
          customer_email: invoice.customer_email,
          pdf_url: invoice.invoice_pdf,
          hosted_url: invoice.hosted_invoice_url,
        });

        const fullInvoice = await stripe.invoices.retrieve(invoice.id, {
          expand: ["lines", "customer"],
        });

        console.log(`📦 Full invoice retrieved (with expansions):`, {
          id: fullInvoice.id,
          number: fullInvoice.number,
          status: fullInvoice.status,
          customer:
            typeof fullInvoice.customer === "object" &&
            fullInvoice.customer &&
            !fullInvoice.customer.deleted
              ? {
                  id: fullInvoice.customer.id,
                  email:
                    "email" in fullInvoice.customer
                      ? fullInvoice.customer.email
                      : undefined,
                  name:
                    "name" in fullInvoice.customer
                      ? fullInvoice.customer.name
                      : undefined,
                }
              : fullInvoice.customer,
          line_items_count: fullInvoice.lines?.data?.length || 0,
        });

        await syncStripeInvoiceToSupabase(fullInvoice, supabase);
        console.log(
          `✅ Synced invoice: ${invoice.id} - Status: ${fullInvoice.status}`,
        );
        break;
      }

      case "invoice.paid": {
        const invoice = event.data.object as Stripe.Invoice;

        // Update invoice status to Paid
        await supabase
          .from("invoices")
          .update({
            status: "Paid",
            synced_at: new Date().toISOString(),
          })
          .eq("stripe_invoice_id", invoice.id);

        // Record payment
        const paymentIntent = (invoice as any).payment_intent;
        if (paymentIntent) {
          const paymentIntentId =
            typeof paymentIntent === "string"
              ? paymentIntent
              : paymentIntent.id;

          // Get invoice ID from Supabase
          const { data: inv } = await supabase
            .from("invoices")
            .select("id")
            .eq("stripe_invoice_id", invoice.id)
            .single();

          if (inv) {
            await supabase.from("payments").upsert(
              {
                invoice_id: inv.id,
                stripe_payment_intent_id: paymentIntentId,
                amount: (invoice.amount_paid || 0) / 100,
                status: "succeeded",
                paid_at: new Date().toISOString(),
              },
              {
                onConflict: "stripe_payment_intent_id",
              },
            );
          }
        }

        console.log(`✅ Invoice paid: ${invoice.id}`);
        break;
      }

      // Payment Intent events (for custom checkout)
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const invoiceId = paymentIntent.metadata.invoice_id;

        if (invoiceId) {
          // Update invoice status
          await supabase
            .from("invoices")
            .update({
              status: "Paid",
              synced_at: new Date().toISOString(),
            })
            .eq("id", invoiceId);

          // Record payment
          await supabase.from("payments").upsert(
            {
              invoice_id: invoiceId,
              stripe_payment_intent_id: paymentIntent.id,
              amount: paymentIntent.amount / 100,
              status: "succeeded",
              payment_method: paymentIntent.payment_method as string,
              paid_at: new Date().toISOString(),
            },
            {
              onConflict: "stripe_payment_intent_id",
            },
          );

          console.log(`✅ Payment succeeded for invoice: ${invoiceId}`);
        }
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const invoiceId = paymentIntent.metadata.invoice_id;

        if (invoiceId) {
          // Record failed payment
          await supabase.from("payments").upsert(
            {
              invoice_id: invoiceId,
              stripe_payment_intent_id: paymentIntent.id,
              amount: paymentIntent.amount / 100,
              status: "failed",
            },
            {
              onConflict: "stripe_payment_intent_id",
            },
          );

          console.log(`❌ Payment failed for invoice: ${invoiceId}`);
        }
        break;
      }

      // Customer events
      case "customer.created":
      case "customer.updated": {
        const customer = event.data.object as Stripe.Customer;

        // Update user with Stripe customer ID
        if (customer.email) {
          await supabase
            .from("users")
            .update({ stripe_customer_id: customer.id })
            .eq("email", customer.email);
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 },
    );
  }
}

// Important: This tells Next.js not to parse the body
export const runtime = "nodejs";
