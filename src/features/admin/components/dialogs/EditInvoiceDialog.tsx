"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group/radio-group";
import type { Invoice, InvoiceStatus } from "@/types";

interface EditInvoiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  invoice: (Invoice & { clientName: string; pdfUrl?: string }) | null;
  onSave: (
    updatedInvoice: Invoice & { clientName: string; pdfUrl?: string },
  ) => void;
}

export default function EditInvoiceDialog({
  isOpen,
  onClose,
  invoice,
  onSave,
}: EditInvoiceDialogProps) {
  const [formData, setFormData] = useState<{
    invoiceNumber: string;
    issueDate: string;
    dueDate: string;
    totalAmount: number;
    status: InvoiceStatus;
    pdfUrl: string;
  }>({
    invoiceNumber: invoice?.invoiceNumber || "",
    issueDate: invoice?.issueDate || "",
    dueDate: invoice?.dueDate || "",
    totalAmount: invoice?.totalAmount || 0,
    status: invoice?.status || "Sent",
    pdfUrl: invoice?.pdfUrl || "",
  });

  React.useEffect(() => {
    if (invoice) {
      setFormData({
        invoiceNumber: invoice.invoiceNumber,
        issueDate: invoice.issueDate,
        dueDate: invoice.dueDate,
        totalAmount: invoice.totalAmount,
        status: invoice.status,
        pdfUrl: invoice.pdfUrl || "",
      });
    }
  }, [invoice]);

  const handleSubmit = () => {
    if (invoice) {
      onSave({
        ...invoice,
        ...formData,
      });
    }
    onClose();
  };

  const statuses = ["Draft", "Sent", "Paid", "Overdue"];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Invoice</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input
              id="invoiceNumber"
              value={formData.invoiceNumber}
              onChange={(e) =>
                setFormData({ ...formData, invoiceNumber: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input
                id="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={(e) =>
                  setFormData({ ...formData, issueDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalAmount">Total Amount</Label>
            <Input
              id="totalAmount"
              type="number"
              step="0.01"
              value={formData.totalAmount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  totalAmount: parseFloat(e.target.value),
                })
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
                  status: value as Invoice["status"],
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

          <div className="space-y-2">
            <Label htmlFor="pdfUrl">PDF URL</Label>
            <Input
              id="pdfUrl"
              type="url"
              placeholder="https://example.com/invoice.pdf"
              value={formData.pdfUrl}
              onChange={(e) =>
                setFormData({ ...formData, pdfUrl: e.target.value })
              }
            />
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
