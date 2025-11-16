"use client";

import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert/alert";
import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { Input } from "@/components/ui/input/input";
import { Label } from "@/components/ui/label/label";
import { Separator } from "@/components/ui/separator/separator";

interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export function AddInvoiceDialog({
  isOpen,
  onClose,
  clientId,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  clientId: string;
  onSuccess?: () => void;
}) {
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0 },
  ]);
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddLineItem = () => {
    setLineItems([
      ...lineItems,
      { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0 },
    ]);
  };

  const handleRemoveLineItem = (index: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((_, i) => i !== index));
    }
  };

  const handleLineItemChange = (
    index: number,
    field: keyof LineItem,
    value: string | number,
  ) => {
    const updated = [...lineItems];
    updated[index] = { ...updated[index], [field]: value };
    setLineItems(updated);
  };

  const calculateTotal = () => {
    return lineItems.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!dueDate) {
      setError("Due date is required");
      setLoading(false);
      return;
    }

    if (lineItems.some((item) => !item.description || item.rate <= 0)) {
      setError("All line items must have a description and rate");
      setLoading(false);
      return;
    }

    try {
      console.log("📝 Creating invoice for client:", clientId);
      console.log("Line items:", lineItems);
      console.log("Due date:", dueDate);

      const response = await fetch("/api/admin/invoices/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          lineItems: lineItems.map(({ id, ...item }) => item),
          dueDate,
          autoSend: false, // Keep as draft initially
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create invoice");
      }

      console.log("✅ Invoice created successfully:", result);

      // Success!
      onSuccess?.();
      onClose();

      // Reset form
      setLineItems([
        { id: crypto.randomUUID(), description: "", quantity: 1, rate: 0 },
      ]);
      setDueDate("");
    } catch (error) {
      console.error("❌ Error creating invoice:", error);
      setError(
        error instanceof Error ? error.message : "Failed to create invoice",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Invoice</DialogTitle>
          <DialogDescription>
            Add line items and set a due date for this invoice. It will be
            created as a draft in Stripe.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date *</Label>
            <Input
              id="dueDate"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          {/* Line Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Line Items</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddLineItem}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>

            {lineItems.map((item, index) => (
              <div key={item.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium">Item {index + 1}</span>
                  {lineItems.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveLineItem(index)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>

                <div className="grid gap-3">
                  <div>
                    <Label htmlFor={`description-${index}`}>
                      Description *
                    </Label>
                    <Input
                      id={`description-${index}`}
                      value={item.description}
                      onChange={(e) =>
                        handleLineItemChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="e.g. Website Design"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleLineItemChange(
                            index,
                            "quantity",
                            parseInt(e.target.value, 10) || 1,
                          )
                        }
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor={`rate-${index}`}>Rate (USD) *</Label>
                      <Input
                        id={`rate-${index}`}
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.rate}
                        onChange={(e) =>
                          handleLineItemChange(
                            index,
                            "rate",
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        placeholder="0.00"
                        required
                      />
                    </div>
                  </div>

                  <div className="text-right text-sm">
                    <span className="text-gray-500">Subtotal: </span>
                    <span className="font-medium">
                      ${(item.quantity * item.rate).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Total */}
            <Separator className="my-4" />
            <div className="flex justify-end">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold">
                  ${calculateTotal().toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Footer */}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Draft Invoice"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
