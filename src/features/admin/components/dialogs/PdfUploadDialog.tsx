"use client";

import { FileText, Upload } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";
import { Separator } from "@/components/ui/separator/separator";

interface PdfUploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, url: string) => void;
  title: string;
  existingUrl?: string;
}

export default function PdfUploadDialog({
  isOpen,
  onClose,
  onUpload,
  title,
  existingUrl,
}: PdfUploadDialogProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState(existingUrl || "");
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        // Create a temporary URL for the file
        const tempUrl = URL.createObjectURL(file);
        setPdfUrl(tempUrl);
      } else {
        toast.error("Please select a PDF file");
      }
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setSelectedFile(file);
        const tempUrl = URL.createObjectURL(file);
        setPdfUrl(tempUrl);
      } else {
        toast.error("Please select a PDF file");
      }
    }
  };

  const handleSubmit = () => {
    if (selectedFile && pdfUrl) {
      onUpload(selectedFile, pdfUrl);
      handleClose();
    } else if (pdfUrl) {
      // If only URL is provided (no file selected), create a dummy File object
      const dummyFile = new File([], "dummy.pdf", { type: "application/pdf" });
      onUpload(dummyFile, pdfUrl);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setPdfUrl(existingUrl || "");
    setDragActive(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* File Upload Area */}
          <section
            aria-label="File upload drop zone"
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive
                ? "border-periwinkle bg-periwinkle/5"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop a PDF file here, or click to browse
            </p>
            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload">
              <Button type="button" variant="outline" size="sm" asChild>
                <span>Browse Files</span>
              </Button>
            </label>
            {selectedFile && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-green-600">
                <FileText className="h-4 w-4" />
                <span>{selectedFile.name}</span>
              </div>
            )}
          </section>

          {/* Or Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or enter URL
              </span>
            </div>
          </div>

          {/* URL Input */}
          <div>
            <Input
              type="url"
              placeholder="https://example.com/document.pdf"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!selectedFile && !pdfUrl}>
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
