import { type NextRequest, NextResponse } from "next/server";
import { getOrCreateStripeCustomer, stripe } from "@/lib/stripe/server";
import { syncStripeInvoiceToSupabase } from "@/lib/stripe/sync";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      clientId,
      lineItems,
      dueDate,
      projectId,
      autoSend = false,
      metadata = {},
    } = body;

    const supabase = await createClient();

    // Get client info from users table
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", clientId)
      .single();

    if (userError || !user) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    // Get or create Stripe customer
    const stripeCustomerId = await getOrCreateStripeCustomer(
      user.id,
      user.email,
      user.full_name,
      supabase,
    );

    // Calculate days until due
    const daysUntilDue = dueDate
      ? Math.ceil(
          (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24),
        )
      : 30;

    // Create draft invoice in Stripe
    console.log("💳 Creating Stripe invoice for customer:", stripeCustomerId);
    const invoice = await stripe.invoices.create({
      customer: stripeCustomerId,
      collection_method: "send_invoice",
      days_until_due: Math.max(daysUntilDue, 1), // At least 1 day
      auto_advance: autoSend, // Auto-finalize if true
      metadata: {
        supabase_client_id: clientId,
        project_id: projectId || "",
        ...metadata,
      },
    });
    console.log("📄 Stripe invoice created:", {
      id: invoice.id,
      status: invoice.status,
      number: invoice.number,
      created: new Date(invoice.created * 1000).toISOString(),
    });

    // Add line items to invoice
    console.log(`📝 Adding ${lineItems.length} line items to invoice...`);
    for (const item of lineItems) {
      const quantity = item.quantity || 1;
      const unitAmount = Math.round(item.rate * 100); // Convert to cents
      await stripe.invoiceItems.create({
        customer: stripeCustomerId,
        invoice: invoice.id,
        description: item.description,
        quantity: quantity,
        amount: unitAmount * quantity, // Total amount for this line item
      });
    }

    // Fetch the invoice with line items
    console.log("🔍 Fetching full invoice data from Stripe...");
    const fullInvoice = await stripe.invoices.retrieve(invoice.id, {
      expand: ["lines", "customer"],
    });

    console.log("📦 Full Stripe invoice data:", {
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
      amount_due: fullInvoice.amount_due / 100,
      amount_paid: fullInvoice.amount_paid / 100,
      currency: fullInvoice.currency,
      due_date: fullInvoice.due_date
        ? new Date(fullInvoice.due_date * 1000).toISOString()
        : null,
      pdf_url: fullInvoice.invoice_pdf,
      hosted_url: fullInvoice.hosted_invoice_url,
      line_items: fullInvoice.lines?.data?.map((line) => ({
        description: line.description,
        quantity: line.quantity,
        amount: line.amount / 100,
      })),
    });

    // Sync to Supabase
    const syncedInvoice = await syncStripeInvoiceToSupabase(
      fullInvoice,
      supabase,
    );

    return NextResponse.json({
      success: true,
      invoice: syncedInvoice,
      stripeInvoiceId: fullInvoice.id,
    });
  } catch (error) {
    console.error("Error creating invoice:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to create invoice",
      },
      { status: 500 },
    );
  }
}
