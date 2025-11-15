// components/invoices/invoice-line-items-table.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table";

type Item = {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
};

export function InvoiceLineItemsTable({ items }: { items: Item[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Description</TableHead>
          <TableHead className="text-center">Qty</TableHead>
          <TableHead className="text-right">Rate</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.description}</TableCell>
            <TableCell className="text-center">{item.quantity}</TableCell>
            <TableCell className="text-right">
              ${item.rate.toFixed(2)}
            </TableCell>
            <TableCell className="text-right">
              ${item.amount.toFixed(2)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
