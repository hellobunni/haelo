// components/invoices/pay-now-button.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { payInvoice } from "@/lib/invoices";

export function PayNowButton({ invoiceId }: { invoiceId: string }) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const handlePayment = async () => {
    console.log(`🔘 Pay Now button clicked for invoice: ${invoiceId}`);
    setPending(true);

    try {
      // Mock payment processing
      const result = await payInvoice(invoiceId);
      
      if (result) {
        console.log(`✅ Payment processed successfully!`);
        // Refresh the page to show updated status
        router.refresh();
      } else {
        console.error(`❌ Payment failed for invoice: ${invoiceId}`);
      }
    } catch (error) {
      console.error(`❌ Payment error:`, error);
    } finally {
      setPending(false);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={pending}
      size="lg"
      className="bg-periwinkle hover:bg-periwinkle/90 text-white font-bold text-lg px-8 py-6 rounded-full"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Processing...
        </>
      ) : (
        "Pay Now"
      )}
    </Button>
  );
}