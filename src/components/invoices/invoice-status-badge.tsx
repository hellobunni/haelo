// components/invoices/invoice-status-badge.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function InvoiceStatusBadge({ status }: { status: string }) {
  const variant = getStatusVariant(status);
  return (
    <Badge className={cn("text-lg px-4 py-1", variant)}>
      {status}
    </Badge>
  );
}

function getStatusVariant(status: string) {
  switch (status) {
    case "Paid":
      return "bg-green-500/20 text-green-600";
    case "Sent":
      return "bg-blue-500/20 text-blue-600";
    case "Overdue":
      return "bg-red-500/20 text-red-600";
    default:
      return "bg-gray-500/20 text-gray-600";
  }
}