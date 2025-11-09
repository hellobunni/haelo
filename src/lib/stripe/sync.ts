import type { SupabaseClient } from "@supabase/supabase-js";
import type Stripe from "stripe";

export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";

export function mapStripeStatusToOurs(
  stripeStatus: Stripe.Invoice.Status,
): InvoiceStatus {
  switch (stripeStatus) {
    case "draft":
      return "Draft";
    case "open":
      return "Sent";
    case "paid":
      return "Paid";
    case "void":
      return "Draft"; // Treating void as draft
    case "uncollectible":
      return "Overdue";
    default:
      return "Draft";
  }
}

// Sync a single Stripe invoice to Supabase
export async function syncStripeInvoiceToSupabase(
  stripeInvoice: Stripe.Invoice,
  supabase: SupabaseClient,
) {
  console.log(`🔄 Syncing Stripe invoice ${stripeInvoice.id}`);
  console.log(`   Status: ${stripeInvoice.status}`);
  console.log(`   Number: ${stripeInvoice.number || "Draft"}`);
  console.log(`   PDF URL: ${stripeInvoice.invoice_pdf || "Not available"}`);
  console.log(
    `   Hosted URL: ${stripeInvoice.hosted_invoice_url || "Not available"}`,
  );

  const customerEmail = stripeInvoice.customer_email || "";
  const customerName =
    typeof stripeInvoice.customer === "object" &&
    stripeInvoice.customer &&
    !stripeInvoice.customer.deleted &&
    "name" in stripeInvoice.customer
      ? stripeInvoice.customer.name || "Unknown"
      : "Unknown";

  // Find client in Supabase by email or Stripe customer ID
  let { data: user } = await supabase
    .from("users")
    .select("id, email, full_name")
    .eq("email", customerEmail)
    .single();

  if (!user) {
    // Try finding by Stripe customer ID
    const stripeCustomerId =
      typeof stripeInvoice.customer === "string"
        ? stripeInvoice.customer
        : stripeInvoice.customer?.id;

    if (stripeCustomerId) {
      console.log(
        `   Looking up user by Stripe customer ID: ${stripeCustomerId}`,
      );
      const { data: userByStripeId } = await supabase
        .from("users")
        .select("id, email, full_name")
        .eq("stripe_customer_id", stripeCustomerId)
        .single();

      user = userByStripeId;
    }
  }

  if (!user) {
    console.error(`❌ User not found for email: ${customerEmail}`);
    throw new Error(`User not found for email: ${customerEmail}`);
  }

  console.log(`   Found user: ${user.full_name} (${user.id})`);

  // Prepare invoice data (adjusted to your schema)
  const invoiceData = {
    stripe_invoice_id: stripeInvoice.id,
    invoice_number:
      stripeInvoice.number || `DRAFT-${stripeInvoice.id.slice(-8)}`,
    client_id: user.id,
    client_email: customerEmail,
    client_name: customerName,
    issue_date: new Date(stripeInvoice.created * 1000)
      .toISOString()
      .split("T")[0],
    due_date: stripeInvoice.due_date
      ? new Date(stripeInvoice.due_date * 1000).toISOString().split("T")[0]
      : new Date(stripeInvoice.created * 1000).toISOString().split("T")[0],
    subtotal: (stripeInvoice.subtotal || 0) / 100,
    // Note: tax_amounts exists at runtime but isn't in Stripe TypeScript types
    tax:
      ((
        stripeInvoice as unknown as { tax_amounts?: Array<{ amount?: number }> }
      ).tax_amounts?.reduce((sum: number, tax) => sum + (tax.amount || 0), 0) ||
        0) / 100,
    total_amount: (stripeInvoice.total || 0) / 100,
    status: mapStripeStatusToOurs(stripeInvoice.status ?? "draft"),
    currency: stripeInvoice.currency,
    pdf_url: stripeInvoice.invoice_pdf || null,
    stripe_hosted_url: stripeInvoice.hosted_invoice_url || null,
    // Note: payment_intent exists at runtime but isn't in Stripe TypeScript types
    stripe_payment_intent_id: (() => {
      type InvoiceWithPaymentIntent = Stripe.Invoice & {
        payment_intent?: string | { id: string } | null;
        charge?: string | { payment_intent?: string | { id: string } } | null;
      };
      const invoice = stripeInvoice as InvoiceWithPaymentIntent;
      // Try to get payment_intent from the invoice
      // It might be expanded or a string ID
      if (invoice.payment_intent) {
        return typeof invoice.payment_intent === "string"
          ? invoice.payment_intent
          : invoice.payment_intent?.id || null;
      }
      // Check charge object if available
      if (
        invoice.charge &&
        typeof invoice.charge === "object" &&
        invoice.charge.payment_intent
      ) {
        return typeof invoice.charge.payment_intent === "string"
          ? invoice.charge.payment_intent
          : invoice.charge.payment_intent?.id || null;
      }
      return null;
    })(),
    metadata: stripeInvoice.metadata || {},
    synced_at: new Date().toISOString(),
    project_id: stripeInvoice.metadata?.project_id || null,
  };

  // Upsert invoice
  const { data: invoice, error: invoiceError } = await supabase
    .from("invoices")
    .upsert(invoiceData, { onConflict: "stripe_invoice_id" })
    .select("id")
    .single();

  if (invoiceError) {
    console.error("❌ Error upserting invoice:", invoiceError);
    throw invoiceError;
  }

  console.log(`   ✅ Invoice upserted to database (ID: ${invoice.id})`);

  // Sync line items
  if (stripeInvoice.lines?.data) {
    // Delete existing line items for this invoice
    await supabase
      .from("invoice_line_items")
      .delete()
      .eq("invoice_id", invoice.id);

    // Insert new line items
    const lineItems = stripeInvoice.lines.data.map((line) => ({
      invoice_id: invoice.id,
      description: line.description || "No description",
      quantity: line.quantity || 1,
      rate: (line.amount || 0) / 100 / (line.quantity || 1),
      amount: (line.amount || 0) / 100,
    }));

    if (lineItems.length > 0) {
      await supabase.from("invoice_line_items").insert(lineItems);
      console.log(`   ✅ Synced ${lineItems.length} line items`);
    }
  }

  console.log(`✅ Sync complete for invoice ${stripeInvoice.id}`);
  return invoice;
}
