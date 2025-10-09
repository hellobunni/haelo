"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

interface PdfViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
}

export default function PdfViewer({ isOpen, onClose, pdfUrl, title }: PdfViewerProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    link.click();
  };

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pr-8">
            <span>{title}</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                title="Download PDF"
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenInNewTab}
                title="Open in new tab"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open
              </Button>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 h-full">
          <iframe
            src={pdfUrl}
            className="w-full h-full rounded-md border"
            title={title}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

