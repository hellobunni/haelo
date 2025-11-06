import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { createClient } from '@/lib/supabase/server';
import { syncStripeInvoiceToSupabase } from '@/lib/stripe/sync';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const invoiceId = params.id;

    // Get Stripe invoice ID from Supabase
    const { data: invoice, error } = await supabase
      .from('invoices')
      .select('stripe_invoice_id')
      .eq('id', invoiceId)
      .single();

    if (error || !invoice?.stripe_invoice_id) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Finalize invoice in Stripe (this makes it ready to send)
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(
      invoice.stripe_invoice_id
    );

    // Send the invoice email to customer
    await stripe.invoices.sendInvoice(invoice.stripe_invoice_id);

    // Fetch full invoice and sync to Supabase
    const fullInvoice = await stripe.invoices.retrieve(
      invoice.stripe_invoice_id,
      { expand: ['lines', 'customer'] }
    );

    await syncStripeInvoiceToSupabase(fullInvoice, supabase);

    return NextResponse.json({
      success: true,
      message: 'Invoice finalized and sent',
      hostedUrl: finalizedInvoice.hosted_invoice_url,
    });
  } catch (error) {
    console.error('Error finalizing invoice:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to finalize invoice' },
      { status: 500 }
    );
  }
}