"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Document, DocumentStatus, DocumentType } from "@/types";

interface EditDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: (Document & { clientName: string }) | null;
  onSave: (updatedDocument: Document & { clientName: string }) => void;
}

export default function EditDocumentDialog({
  isOpen,
  onClose,
  document,
  onSave,
}: EditDocumentDialogProps) {
  const [formData, setFormData] = useState<{
    documentName: string;
    documentType: DocumentType;
    uploadDate: string;
    fileUrl: string;
    status: DocumentStatus;
  }>({
    documentName: document?.documentName || "",
    documentType: document?.documentType || "Document",
    uploadDate: document?.uploadDate || "",
    fileUrl: document?.fileUrl || "",
    status: document?.status || "Pending",
  });

  React.useEffect(() => {
    if (document) {
      setFormData({
        documentName: document.documentName,
        documentType: document.documentType,
        uploadDate: document.uploadDate,
        fileUrl: document.fileUrl,
        status: document.status,
      });
    }
  }, [document]);

  const handleSubmit = () => {
    if (document) {
      onSave({
        ...document,
        ...formData,
      });
    }
    onClose();
  };

  const statuses = ["Pending", "Viewed", "Signed"];
  const documentTypes = [
    "Proposal",
    "Contract",
    "Brief",
    "Report",
    "Deliverable",
    "Document",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Document</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="documentName">Document Name</Label>
            <Input
              id="documentName"
              value={formData.documentName}
              onChange={(e) =>
                setFormData({ ...formData, documentName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Document Type</Label>
            <RadioGroup
              value={formData.documentType}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  documentType: value as DocumentType,
                })
              }
              className="flex flex-row flex-wrap gap-4"
            >
              {documentTypes.map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} id={`type-${type}`} />
                  <Label
                    htmlFor={`type-${type}`}
                    className="cursor-pointer font-normal"
                  >
                    {type}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="uploadDate">Upload Date</Label>
            <Input
              id="uploadDate"
              type="date"
              value={formData.uploadDate}
              onChange={(e) =>
                setFormData({ ...formData, uploadDate: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fileUrl">File URL</Label>
            <Input
              id="fileUrl"
              type="url"
              placeholder="https://example.com/document.pdf"
              value={formData.fileUrl}
              onChange={(e) =>
                setFormData({ ...formData, fileUrl: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <RadioGroup
              value={formData.status}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  status: value as Document["status"],
                })
              }
              className="flex flex-row gap-4"
            >
              {statuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <RadioGroupItem value={status} id={`status-${status}`} />
                  <Label
                    htmlFor={`status-${status}`}
                    className="cursor-pointer font-normal"
                  >
                    {status}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
