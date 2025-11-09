"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AddInvoiceDialog } from "@/features/admin/components/dialogs/AddInvoiceDialog";

export function AddInvoiceButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const clientId = params.id as string;

  const handleSuccess = () => {
    setIsDialogOpen(false);
    // Refresh the page to show new invoice
    router.refresh();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsDialogOpen(true)}
        className="p-2 border border-[var(--border)] rounded-full bg-white/50 backdrop-blur-md cursor-pointer hover:bg-white transition-colors"
        aria-label="Add Invoice"
      >
        <Plus className="h-5 w-5 text-periwinkle" />
      </button>

      <AddInvoiceDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        clientId={clientId}
        onSuccess={handleSuccess}
      />
    </>
  );
}
