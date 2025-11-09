import { type NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe/server";
import { syncStripeInvoiceToSupabase } from "@/lib/stripe/sync";
import { createClient } from "@/lib/supabase/server";

export async function POST(_request: NextRequest) {
  try {
    const supabase = await createClient();

    console.log("🔄 Syncing all invoices from Stripe...");

    // Fetch all invoices from Supabase that have a Stripe invoice ID
    const { data: dbInvoices, error: dbError } = await supabase
      .from("invoices")
      .select("id, stripe_invoice_id")
      .not("stripe_invoice_id", "is", null);

    if (dbError) {
      throw dbError;
    }

    console.log(`📊 Found ${dbInvoices?.length || 0} invoices to sync`);

    let syncedCount = 0;
    let errorCount = 0;

    // Sync each invoice
    for (const invoice of dbInvoices || []) {
      try {
        console.log(
          `🔄 Fetching invoice ${invoice.stripe_invoice_id} from Stripe...`,
        );
        if (!invoice.stripe_invoice_id) {
          console.warn(`⚠️ Invoice ${invoice.id} has no Stripe invoice ID, skipping`);
          continue;
        }
        const stripeInvoice = await stripe.invoices.retrieve(
          invoice.stripe_invoice_id,
          { expand: ["lines", "customer"] },
        );

        console.log(`📦 Stripe data for ${invoice.stripe_invoice_id}:`, {
          number: stripeInvoice.number,
          status: stripeInvoice.status,
          amount: stripeInvoice.amount_due / 100,
          pdf_url: stripeInvoice.invoice_pdf,
          hosted_url: stripeInvoice.hosted_invoice_url,
        });

        await syncStripeInvoiceToSupabase(stripeInvoice, supabase);
        syncedCount++;
        console.log(
          `✅ Synced invoice ${invoice.id} (${stripeInvoice.number})`,
        );
      } catch (error) {
        errorCount++;
        console.error(`❌ Error syncing invoice ${invoice.id}:`, error);
      }
    }

    console.log(
      `✅ Sync complete: ${syncedCount} synced, ${errorCount} errors`,
    );

    return NextResponse.json({
      success: true,
      synced: syncedCount,
      errors: errorCount,
      total: dbInvoices?.length || 0,
    });
  } catch (error) {
    console.error("❌ Error syncing all invoices:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to sync invoices",
      },
      { status: 500 },
    );
  }
}
