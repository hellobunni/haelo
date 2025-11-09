import { createClient } from "@/lib/supabase/client";
import type { Invoice, InvoiceLineItem } from "@/types";

// Client-side versions of invoice API functions
// These use the browser Supabase client and can be called from client components

export async function getAllInvoicesByEmailClient(
  email: string,
): Promise<Invoice[]> {
  console.log(`📬 [Client] Fetching all invoices for email: ${email}`);

  const supabase = createClient();

  const { data: invoices, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("client_email", email)
    .order("issue_date", { ascending: false });

  if (error) {
    console.error(`❌ [Client] Error fetching invoices:`, error);
    return [];
  }

  console.log(
    `✅ [Client] Found ${invoices?.length || 0} invoice(s) for ${email}`,
  );

  // Transform database columns to match Invoice type
  return (invoices || []).map((invoice) => ({
    id: invoice.id,
    invoiceNumber: invoice.invoice_number,
    clientEmail: invoice.client_email,
    issueDate: invoice.issue_date,
    dueDate: invoice.due_date,
    totalAmount: Number(invoice.total_amount),
    status: invoice.status,
    pdfUrl: invoice.pdf_url,
    stripeInvoiceId: invoice.stripe_invoice_id,
    stripeHostedUrl: invoice.stripe_hosted_url,
  }));
}

export async function getInvoiceByIdClient(
  id: string,
): Promise<Invoice | null> {
  console.log(`📄 [Client] Fetching invoice with ID: ${id}`);

  const supabase = createClient();

  const { data: invoice, error } = await supabase
    .from("invoices")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`❌ [Client] Error fetching invoice:`, error);
    return null;
  }

  if (!invoice) {
    console.log(`❌ [Client] Invoice not found for ID: ${id}`);
    return null;
  }

  console.log(`✅ [Client] Invoice found:`, invoice.invoice_number);

  // Transform database columns to match Invoice type
  return {
    id: invoice.id,
    invoiceNumber: invoice.invoice_number,
    clientEmail: invoice.client_email,
    issueDate: invoice.issue_date,
    dueDate: invoice.due_date,
    totalAmount: Number(invoice.total_amount),
    status: invoice.status,
    pdfUrl: invoice.pdf_url,
    stripeInvoiceId: invoice.stripe_invoice_id,
    stripeHostedUrl: invoice.stripe_hosted_url,
  };
}

export async function getLineItemsByInvoiceIdClient(
  invoiceId: string,
): Promise<InvoiceLineItem[]> {
  console.log(`📋 [Client] Fetching line items for invoice: ${invoiceId}`);

  const supabase = createClient();

  const { data: items, error } = await supabase
    .from("invoice_line_items")
    .select("*")
    .eq("invoice_id", invoiceId)
    .order("id", { ascending: true });

  if (error) {
    console.error(`❌ [Client] Error fetching line items:`, error);
    return [];
  }

  console.log(
    `✅ [Client] Found ${items?.length || 0} line item(s) for invoice ${invoiceId}`,
  );

  // Transform database columns to match InvoiceLineItem type
  return (items || []).map((item) => ({
    id: item.id,
    invoiceId: item.invoice_id,
    description: item.description,
    quantity: item.quantity,
    rate: Number(item.rate),
    amount: Number(item.amount),
  }));
}

