"use client";

import { format } from "date-fns";
import { Edit, Eye, FileText, RefreshCw, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAllInvoices } from "@/features/admin/api";
import type { InvoiceWithClient } from "@/types";
import EditInvoiceDialog from "../dialogs/EditInvoiceDialog";
import PdfUploadDialog from "../dialogs/PdfUploadDialog";
import PdfViewer from "../dialogs/PdfViewer";

export default function InvoicesTab() {
  const [invoices, setInvoices] = useState<InvoiceWithClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [selectedInvoicePdf, setSelectedInvoicePdf] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] =
    useState<InvoiceWithClient | null>(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const data = await getAllInvoices();
        // Sort by issue date descending
        data.sort(
          (a, b) =>
            new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime(),
        );
        setInvoices(data);
      } catch (error) {
        console.error("Error fetching invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500/20 text-green-600";
      case "Sent":
        return "bg-blue-500/20 text-blue-600";
      case "Overdue":
        return "bg-red-500/20 text-red-600";
      case "Draft":
        return "bg-gray-500/20 text-gray-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  const handleViewPdf = (invoice: InvoiceWithClient) => {
    if (invoice.pdfUrl) {
      setSelectedInvoicePdf({
        url: invoice.pdfUrl,
        title: `Invoice ${invoice.invoiceNumber} - ${invoice.clientName}`,
      });
      setPdfViewerOpen(true);
    } else {
      toast.error("No PDF available for this invoice");
    }
  };

  const handleUploadPdf = (invoice: InvoiceWithClient) => {
    setSelectedInvoice(invoice);
    setUploadDialogOpen(true);
  };

  const handleEdit = (invoice: InvoiceWithClient) => {
    setSelectedInvoice(invoice);
    setEditDialogOpen(true);
  };

  const handlePdfUpload = (_file: File, url: string) => {
    if (selectedInvoice) {
      // Update the invoice with the new PDF URL
      const updatedInvoices = invoices.map((inv) =>
        inv.id === selectedInvoice.id ? { ...inv, pdfUrl: url } : inv,
      );
      setInvoices(updatedInvoices);
      console.log(
        `📄 PDF uploaded for invoice ${selectedInvoice.invoiceNumber}:`,
        url,
      );
    }
  };

  const handleSaveInvoice = (updatedInvoice: InvoiceWithClient) => {
    const updatedInvoices = invoices.map((inv) =>
      inv.id === updatedInvoice.id ? updatedInvoice : inv,
    );
    setInvoices(updatedInvoices);
    console.log(`✅ Invoice ${updatedInvoice.invoiceNumber} updated`);
  };

  const handleSyncAll = async () => {
    setSyncing(true);
    try {
      const response = await fetch("/api/admin/invoices/sync-all", {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to sync invoices");
      }

      console.log(`✅ Synced ${result.synced} invoices`);

      // Refresh the invoices list
      const data = await getAllInvoices();
      data.sort(
        (a, b) =>
          new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime(),
      );
      setInvoices(data);
    } catch (error) {
      console.error("❌ Error syncing invoices:", error);
      toast.error("Failed to sync invoices from Stripe");
    } finally {
      setSyncing(false);
    }
  };

  const handleSyncSingle = async (invoiceId: string) => {
    setSyncingId(invoiceId);
    try {
      const response = await fetch(`/api/admin/invoices/${invoiceId}/sync`, {
        method: "POST",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to sync invoice");
      }

      console.log(`✅ Synced invoice ${invoiceId}`);

      // Update the specific invoice in the list
      const updatedInvoices = invoices.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              ...result.invoice,
              // Transform snake_case to camelCase
              invoiceNumber: result.invoice.invoice_number,
              clientEmail: result.invoice.client_email,
              clientName: result.invoice.client_name,
              issueDate: result.invoice.issue_date,
              dueDate: result.invoice.due_date,
              totalAmount: result.invoice.total_amount,
              pdfUrl: result.invoice.pdf_url,
              stripeInvoiceId: result.invoice.stripe_invoice_id,
              stripeHostedUrl: result.invoice.stripe_hosted_url,
            }
          : inv,
      );
      setInvoices(updatedInvoices);
    } catch (error) {
      console.error("❌ Error syncing invoice:", error);
      toast.error("Failed to sync invoice from Stripe");
    } finally {
      setSyncingId(null);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              <Skeleton className="h-6 w-32" />
            </CardTitle>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-28" />
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-5 w-24" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`skeleton-invoice-${i}`}
                className="flex items-center gap-4 py-3 border-b"
              >
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalRevenue = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const pendingRevenue = invoices
    .filter((inv) => inv.status === "Sent" || inv.status === "Overdue")
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            All Invoices ({invoices.length})
          </CardTitle>
          <div className="flex gap-2">
            <Button
              onClick={handleSyncAll}
              disabled={syncing}
              variant="outline"
              size="sm"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${syncing ? "animate-spin" : ""}`}
              />
              {syncing ? "Syncing..." : "Sync from Stripe"}
            </Button>
            <Button
              onClick={() => {
                setSelectedInvoice(null);
                setUploadDialogOpen(true);
              }}
              size="sm"
            >
              <Upload className="h-4 w-4 mr-2" />
              New Invoice
            </Button>
          </div>
        </div>
        <div className="flex gap-6 mt-4 text-sm">
          <div>
            <span className="text-gray-500">Total Revenue:</span>
            <span className="ml-2 font-bold text-green-600">
              $
              {totalRevenue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Pending:</span>
            <span className="ml-2 font-bold text-blue-600">
              $
              {pendingRevenue.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {invoices.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Source</TableHead>
                <TableHead className="text-center">PDF</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">
                    {invoice.invoiceNumber}
                  </TableCell>
                  <TableCell>{invoice.clientName}</TableCell>
                  <TableCell>
                    {format(new Date(invoice.issueDate), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>
                    {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${invoice.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={getStatusClass(invoice.status)}>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {invoice.stripeInvoiceId ? (
                      <Badge className="bg-purple-500/20 text-purple-600">
                        <span className="mr-1">⚡</span>
                        Stripe
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-500/20 text-gray-600">
                        Manual
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {invoice.pdfUrl ? (
                      <Badge className="bg-green-500/20 text-green-600">
                        <FileText className="h-3 w-3 mr-1" />
                        Available
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-500/20 text-gray-600">
                        No PDF
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      {invoice.stripeInvoiceId && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleSyncSingle(invoice.id)}
                              disabled={syncingId === invoice.id}
                            >
                              <RefreshCw
                                className={`h-4 w-4 ${syncingId === invoice.id ? "animate-spin" : ""}`}
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Sync from Stripe</TooltipContent>
                        </Tooltip>
                      )}
                      {invoice.stripeHostedUrl && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                window.open(invoice.stripeHostedUrl, "_blank")
                              }
                            >
                              <span className="text-purple-600">⚡</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View in Stripe</TooltipContent>
                        </Tooltip>
                      )}
                      {invoice.pdfUrl && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewPdf(invoice)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>View PDF</TooltipContent>
                        </Tooltip>
                      )}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleUploadPdf(invoice)}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Upload PDF</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(invoice)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Invoice</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No invoices found
            </h3>
          </div>
        )}
      </CardContent>

      {/* PDF Viewer Dialog */}
      {selectedInvoicePdf && (
        <PdfViewer
          isOpen={pdfViewerOpen}
          onClose={() => {
            setPdfViewerOpen(false);
            setSelectedInvoicePdf(null);
          }}
          pdfUrl={selectedInvoicePdf.url}
          title={selectedInvoicePdf.title}
        />
      )}

      {/* PDF Upload Dialog */}
      <PdfUploadDialog
        isOpen={uploadDialogOpen}
        onClose={() => {
          setUploadDialogOpen(false);
          setSelectedInvoice(null);
        }}
        onUpload={handlePdfUpload}
        title={
          selectedInvoice
            ? `Upload PDF for Invoice ${selectedInvoice.invoiceNumber}`
            : "Upload New Invoice"
        }
        existingUrl={selectedInvoice?.pdfUrl}
      />

      {/* Edit Invoice Dialog */}
      <EditInvoiceDialog
        isOpen={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedInvoice(null);
        }}
        invoice={selectedInvoice}
        onSave={handleSaveInvoice}
      />
    </Card>
  );
}
