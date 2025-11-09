"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getStripe } from "@/lib/stripe/client";

function CheckoutForm({
  invoiceId,
  onSuccess,
}: {
  invoiceId: string;
  onSuccess?: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/invoices/${invoiceId}/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "Payment failed");
      setIsProcessing(false);
    } else {
      onSuccess?.();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {errorMessage && (
        <div className="text-red-600 text-sm">{errorMessage}</div>
      )}
      <Button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        {isProcessing ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </Button>
    </form>
  );
}

export function PayNowButton({
  invoiceId,
  amount,
  currency = "USD",
}: {
  invoiceId: string;
  amount: number;
  currency?: string;
}) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePayClick = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/invoices/${invoiceId}/payment-intent`,
        {
          method: "POST",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to initialize payment");
      }

      // If Stripe hosted invoice URL is available, redirect to it
      if (data.useStripeHosted && data.hostedInvoiceUrl) {
        window.location.href = data.hostedInvoiceUrl;
        return;
      }

      // Otherwise use custom checkout
      setClientSecret(data.clientSecret);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to initialize payment",
      );
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="space-y-2">
        <div className="text-red-600 text-sm">{error}</div>
        <Button onClick={handlePayClick} disabled={loading}>
          Try Again
        </Button>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <Button
        onClick={handlePayClick}
        disabled={loading}
        size="lg"
        className="w-full"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          `Pay ${currency} ${amount.toFixed(2)}`
        )}
      </Button>
    );
  }

  return (
    <Elements
      stripe={getStripe()}
      options={{
        clientSecret,
        appearance: {
          theme: "stripe",
        },
      }}
    >
      <CheckoutForm invoiceId={invoiceId} />
    </Elements>
  );
}
