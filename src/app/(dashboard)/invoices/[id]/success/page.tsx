import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function PaymentSuccessPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // Fetch invoice to verify
  const { data: invoice } = await supabase
    .from("invoices")
    .select("invoice_number, total_amount, currency, status")
    .eq("id", params.id)
    .single();

  if (!invoice) {
    redirect("/client-portal");
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <CheckCircle className="mx-auto h-16 w-16 text-green-600 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-gray-600 mb-8">
        Thank you for your payment of {invoice.currency?.toUpperCase()} $
        {invoice.total_amount.toFixed(2)}
      </p>
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <p className="text-sm text-gray-600">Invoice Number</p>
        <p className="text-xl font-bold">{invoice.invoice_number}</p>
        <p className="text-sm text-green-600 mt-2">Status: {invoice.status}</p>
      </div>
      <div className="space-x-4">
        <Button asChild>
          <Link href={`/invoices/${params.id}`}>View Invoice</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/client-portal">Back to Portal</Link>
        </Button>
      </div>
    </div>
  );
}
