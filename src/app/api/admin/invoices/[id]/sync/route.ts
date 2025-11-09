import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { syncStripeInvoiceToSupabase } from "@/lib/stripe/sync";
import { createClient } from "@/lib/supabase/server";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const supabase = await createClient();

    // Get the invoice from Supabase to find the Stripe invoice ID
    const { data: invoice, error: invoiceError } = await supabase
      .from("invoices")
      .select("stripe_invoice_id")
      .eq("id", id)
      .single();

    if (invoiceError || !invoice) {
      return NextResponse.json(
        { error: "Invoice not found in database" },
        { status: 404 },
      );
    }

    if (!invoice.stripe_invoice_id) {
      return NextResponse.json(
        { error: "This invoice is not linked to Stripe" },
        { status: 400 },
      );
    }

    console.log(
      `🔄 Syncing invoice ${id} from Stripe (${invoice.stripe_invoice_id})`,
    );

    // Fetch the latest data from Stripe
    const stripeInvoice = await stripe.invoices.retrieve(
      invoice.stripe_invoice_id,
      { expand: ["lines", "customer"] },
    );

    console.log("📦 Retrieved Stripe invoice data:", {
      id: stripeInvoice.id,
      number: stripeInvoice.number,
      status: stripeInvoice.status,
      customer:
        typeof stripeInvoice.customer === "object" &&
        stripeInvoice.customer &&
        !stripeInvoice.customer.deleted
          ? {
              id: stripeInvoice.customer.id,
              email:
                "email" in stripeInvoice.customer
                  ? stripeInvoice.customer.email
                  : undefined,
              name:
                "name" in stripeInvoice.customer
                  ? stripeInvoice.customer.name
                  : undefined,
            }
          : stripeInvoice.customer,
      amount_due: stripeInvoice.amount_due / 100,
      amount_paid: stripeInvoice.amount_paid / 100,
      currency: stripeInvoice.currency,
      created: new Date(stripeInvoice.created * 1000).toISOString(),
      due_date: stripeInvoice.due_date
        ? new Date(stripeInvoice.due_date * 1000).toISOString()
        : null,
      pdf_url: stripeInvoice.invoice_pdf,
      hosted_url: stripeInvoice.hosted_invoice_url,
      payment_intent: (() => {
        const invoiceAny = stripeInvoice as any;
        if (invoiceAny.payment_intent) {
          return typeof invoiceAny.payment_intent === "string"
            ? invoiceAny.payment_intent
            : invoiceAny.payment_intent.id || null;
        }
        return null;
      })(),
      line_items_count: stripeInvoice.lines?.data?.length || 0,
      line_items: stripeInvoice.lines?.data?.map((line) => ({
        id: line.id,
        description: line.description,
        quantity: line.quantity,
        amount: line.amount / 100,
      })),
    });

    // Sync it to Supabase
    await syncStripeInvoiceToSupabase(stripeInvoice, supabase);

    // Fetch the updated invoice data
    const { data: updatedInvoice } = await supabase
      .from("invoices")
      .select("*")
      .eq("id", id)
      .single();

    console.log(`✅ Invoice synced successfully - Updated database record:`, {
      id: updatedInvoice?.id,
      invoice_number: updatedInvoice?.invoice_number,
      status: updatedInvoice?.status,
      pdf_url: updatedInvoice?.pdf_url,
      stripe_hosted_url: updatedInvoice?.stripe_hosted_url,
    });

    return NextResponse.json({
      success: true,
      invoice: updatedInvoice,
    });
  } catch (error) {
    console.error("❌ Error syncing invoice:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to sync invoice",
      },
      { status: 500 },
    );
  }
}
