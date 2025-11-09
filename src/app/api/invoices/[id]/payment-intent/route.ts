import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: invoiceId } = await params;
    const supabase = await createClient();

    // Get invoice from Supabase
    const { data: invoice, error } = await supabase
      .from("invoices")
      .select(`
        *,
        users!client_id (
          id,
          email,
          full_name,
          stripe_customer_id
        )
      `)
      .eq("id", invoiceId)
      .single();

    if (error || !invoice) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    // Verify the authenticated user is the invoice owner
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user?.id !== invoice.client_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Check if invoice is already paid
    if (invoice.status === "Paid") {
      return NextResponse.json(
        { error: "Invoice already paid" },
        { status: 400 },
      );
    }

    // If invoice already has a Stripe invoice, use that
    if (invoice.stripe_invoice_id) {
      return NextResponse.json({
        hostedInvoiceUrl: invoice.stripe_hosted_url,
        useStripeHosted: true,
      });
    }

    // Otherwise create Payment Intent for custom checkout
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(invoice.total_amount * 100),
      currency: invoice.currency || "usd",
      customer: invoice.users.stripe_customer_id,
      metadata: {
        invoice_id: invoice.id,
        invoice_number: invoice.invoice_number,
      },
      automatic_payment_methods: { enabled: true },
    });

    // Store payment intent ID
    await supabase
      .from("invoices")
      .update({ stripe_payment_intent_id: paymentIntent.id })
      .eq("id", invoiceId);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      useStripeHosted: false,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: "Failed to create payment intent" },
      { status: 500 },
    );
  }
}
