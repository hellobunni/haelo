"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
import type { DocumentRecord } from "@/lib/mock-data/projects-documents";

interface EditDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  document: (DocumentRecord & { clientName: string }) | null;
  onSave: (updatedDocument: DocumentRecord & { clientName: string }) => void;
}

export default function EditDocumentDialog({
  isOpen,
  onClose,
  document,
  onSave,
}: EditDocumentDialogProps) {
  const [formData, setFormData] = useState({
    documentName: document?.documentName || "",
    documentType: document?.documentType || "",
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
            <div className="flex gap-2 flex-wrap">
              {documentTypes.map((type) => (
                <Badge
                  key={type}
                  className={`cursor-pointer ${
                    formData.documentType === type
                      ? "bg-periwinkle text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() =>
                    setFormData({ ...formData, documentType: type })
                  }
                >
                  {type}
                </Badge>
              ))}
            </div>
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
            <div className="flex gap-2 flex-wrap">
              {statuses.map((status) => (
                <Badge
                  key={status}
                  className={`cursor-pointer ${
                    formData.status === status
                      ? "bg-periwinkle text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      status: status as DocumentRecord["status"],
                    })
                  }
                >
                  {status}
                </Badge>
              ))}
            </div>
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
