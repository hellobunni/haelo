export type InvoiceStatus = "Draft" | "Sent" | "Paid" | "Overdue";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  clientEmail: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  status: InvoiceStatus;
  pdfUrl?: string;
}

export interface InvoiceLineItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

// Extended type with client info for admin views
export interface InvoiceWithClient extends Invoice {
  clientName: string;
}


