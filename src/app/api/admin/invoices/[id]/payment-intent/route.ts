import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    const invoiceId = params.id;

    // Get invoice from Supabase
    const { data: invoice, error } = await supabase
      .from('invoices')
      .select('*, users!client_id(*)')
      .eq('id', invoiceId)
      .single();

    if (error || !invoice) {
      return NextResponse.json(
        { error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Check if invoice is already paid
    if (invoice.status === 'Paid') {
      return NextResponse.json(
        { error: 'Invoice already paid' },
        { status: 400 }
      );
    }

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(invoice.total_amount * 100), // Convert to cents
      currency: invoice.currency || 'usd',
      customer: invoice.users.stripe_customer_id,
      metadata: {
        invoice_id: invoice.id,
        invoice_number: invoice.invoice_number,
        stripe_invoice_id: invoice.stripe_invoice_id || '',
      },
      automatic_payment_methods: { enabled: true },
    });

    // Store payment intent ID
    await supabase
      .from('invoices')
      .update({ stripe_payment_intent_id: paymentIntent.id })
      .eq('id', invoiceId);

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}