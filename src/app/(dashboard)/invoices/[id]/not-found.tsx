// app/(portal)/invoices/[id]/not-found.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="text-center py-32">
      <h1 className="sub-heading">Invoice Not Found</h1>
      <p className="text-gray-500 mt-4">
        The invoice you are looking for could not be found.
      </p>
      <Link href="/client-portal">
        <Button className="mt-8">Back to Portal</Button>
      </Link>
    </div>
  );
}
