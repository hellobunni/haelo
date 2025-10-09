// app/(portal)/invoices/[id]/loading.tsx
import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <Loader2 className="h-12 w-12 animate-spin text-periwinkle" />
    </div>
  );
}
