// components/invoices/invoice-header.tsx
export function InvoiceHeader({
    title,
    subtitle,
  }: {
    title: string;
    subtitle?: string;
  }) {
    return (
      <div>
        <h2 className="text-3xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        ) : null}
      </div>
    );
  }