// components/invoices/invoice-totals.tsx
export function InvoiceTotals({ total }: { total: number }) {
    return (
      <div className="w-full max-w-xs space-y-2">
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    );
  }