"use client";

import { Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InvoicePDFActionsProps {
  pdfUrl: string;
  invoiceNumber: string;
}

export function InvoicePDFActions({ pdfUrl, invoiceNumber }: InvoicePDFActionsProps) {
  const handleView = () => {
    console.log(`👁️ [Mock] Viewing PDF for ${invoiceNumber}`);
    window.open(pdfUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = () => {
    console.log(`📥 [Mock] Downloading PDF for ${invoiceNumber}`);
    // Create a temporary link to trigger download
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${invoiceNumber}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex justify-end gap-2 mb-4">
      <Button variant="outline" size="sm" onClick={handleView}>
        <Eye className="mr-2 h-4 w-4" />
        View PDF
      </Button>
      <Button variant="outline" size="sm" onClick={handleDownload}>
        <Download className="mr-2 h-4 w-4" />
        Download PDF
      </Button>
    </div>
  );
}
