import { format } from "date-fns";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InvoiceHeader } from "@/features/invoices/components/InvoiceHeader";
import { InvoiceLineItemsTable } from "@/features/invoices/components/InvoiceLineItemsTables";
import { InvoicePDFActions } from "@/features/invoices/components/InvoicePDFActions";
import { InvoiceStatusBadge } from "@/features/invoices/components/InvoiceStatusBadge";
import { InvoiceTotals } from "@/features/invoices/components/InvoiceTotals";
import { PayNowButton } from "@/features/invoices/components/PayNowButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getInvoiceById, getLineItemsByInvoiceId } from "@/features/invoices/api";

type Props = { params: { id: string } };

export default async function InvoicePage({ params }: Props) {
  const invoice = await getInvoiceById(params.id);
  if (!invoice) return notFound();

  const lineItems = await getLineItemsByInvoiceId(invoice.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* PDF buttons - only show if PDF exists */}
      {invoice.pdfUrl && (
        <InvoicePDFActions
          pdfUrl={invoice.pdfUrl}
          invoiceNumber={invoice.invoiceNumber}
        />
      )}

      <Card>
        <CardHeader className="bg-gray-50 p-6 rounded-t-lg">
          <div className="flex items-start justify-between">
            <InvoiceHeader
              title={`Invoice ${invoice.invoiceNumber}`}
              subtitle={`Issued: ${format(new Date(invoice.issueDate), "MMMM d, yyyy")}`}
            />
            <InvoiceStatusBadge status={invoice.status} />
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
            <div>
              <h3 className="font-semibold text-gray-500 uppercase tracking-wider">
                Billed To
              </h3>
              <p>{invoice.clientEmail}</p>
            </div>
            <div className="text-right">
              <h3 className="font-semibold text-gray-500 uppercase tracking-wider">
                From
              </h3>
              <p>Matte Digital</p>
              <p>hello@mattedigital.com</p>
            </div>
          </div>

          <InvoiceLineItemsTable items={lineItems} />

          <div className="flex justify-end mt-6">
            <InvoiceTotals total={invoice.totalAmount} />
          </div>
        </CardContent>

        <CardFooter className="bg-gray-50 p-6 rounded-b-lg flex justify-between items-center">
          <div>
            <p className="font-semibold">Due Date</p>
            <p className="text-gray-600">
              {format(new Date(invoice.dueDate), "MMMM d, yyyy")}
            </p>
          </div>

          {invoice.status !== "Paid" ? (
            <PayNowButton invoiceId={invoice.id} />
          ) : (
            <div className="text-green-600 font-bold text-lg">
              Paid in Full ✅
            </div>
          )}
        </CardFooter>
      </Card>

      <div className="text-center mt-8">
        <Link
          href="/client-portal"
          className="text-sm text-periwinkle hover:underline"
        >
          &larr; Back to Portal
        </Link>
      </div>
    </div>
  );
}
