"use client";

import { useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import type { User } from "@/types";

interface AddClientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (
    newClient: Omit<User, "id" | "password" | "createdAt" | "updatedAt">,
  ) => void;
}

export default function AddClientDialog({
  isOpen,
  onClose,
  onSave,
}: AddClientDialogProps) {
  const [formData, setFormData] = useState<{
    full_name: string;
    email: string;
    company: string;
    phone: string;
  }>({
    full_name: "",
    email: "",
    company: "",
    phone: "",
  });

  const [errors, setErrors] = useState<{
    full_name?: string;
    email?: string;
  }>({});

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    onSave({
      email: formData.email.trim(),
      full_name: formData.full_name.trim(),
      role: "client",
      company: formData.company.trim() || undefined,
      phone: formData.phone.trim() || undefined,
    });

    // Reset form
    setFormData({
      full_name: "",
      email: "",
      company: "",
      phone: "",
    });
    setErrors({});
    onClose();
  };

  const handleCancel = () => {
    // Reset form on cancel
    setFormData({
      full_name: "",
      email: "",
      company: "",
      phone: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-md max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="full_name"
                placeholder="John Doe"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                className={errors.full_name ? "border-red-500" : ""}
              />
              {errors.full_name && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{errors.full_name}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>{errors.email}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                placeholder="Acme Inc."
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-md p-3">
              <p className="text-sm text-gray-600">
                <strong>Note:</strong> A temporary password will be generated
                and sent to the client's email address.
              </p>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add Client</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
