import type { Invoice, InvoiceLineItem } from "@/types";
import { createClient } from "@/lib/supabase/server";

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  console.log(`📄 [Supabase] Fetching invoice with ID: ${id}`);
  
  const supabase = await createClient();

  const { data: invoice, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error(`❌ [Supabase] Error fetching invoice:`, error);
    return null;
  }

  if (!invoice) {
    console.log(`❌ [Supabase] Invoice not found for ID: ${id}`);
    return null;
  }

  console.log(`✅ [Supabase] Invoice found:`, invoice.invoice_number);

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

export async function getLineItemsByInvoiceId(
  invoiceId: string,
): Promise<InvoiceLineItem[]> {
  console.log(`📋 [Supabase] Fetching line items for invoice: ${invoiceId}`);
  
  const supabase = await createClient();

  const { data: items, error } = await supabase
    .from('invoice_line_items')
    .select('*')
    .eq('invoice_id', invoiceId)
    .order('id', { ascending: true });

  if (error) {
    console.error(`❌ [Supabase] Error fetching line items:`, error);
    return [];
  }

  console.log(
    `✅ [Supabase] Found ${items?.length || 0} line item(s) for invoice ${invoiceId}`,
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

export async function getAllInvoicesByEmail(email: string): Promise<Invoice[]> {
  console.log(`📬 [Supabase] Fetching all invoices for email: ${email}`);
  
  const supabase = await createClient();

  const { data: invoices, error } = await supabase
    .from('invoices')
    .select('*')
    .eq('client_email', email)
    .order('issue_date', { ascending: false });

  if (error) {
    console.error(`❌ [Supabase] Error fetching invoices:`, error);
    return [];
  }

  console.log(`✅ [Supabase] Found ${invoices?.length || 0} invoice(s) for ${email}`);

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

export async function payInvoice(id: string): Promise<Invoice | null> {
  console.log(`💳 [Supabase] Processing payment for invoice: ${id}`);
  
  const supabase = await createClient();

  // Update invoice status to Paid
  const { data: invoice, error } = await supabase
    .from('invoices')
    .update({ status: 'Paid' })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error(`❌ [Supabase] Error updating invoice:`, error);
    return null;
  }

  if (!invoice) {
    console.log(`❌ [Supabase] Payment failed - Invoice ${id} not found`);
    return null;
  }

  console.log(
    `✅ [Supabase] Payment successful! Invoice ${id} is now marked as Paid`,
  );

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
