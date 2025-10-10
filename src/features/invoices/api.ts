import type { Invoice, InvoiceLineItem, InvoiceWithClient } from "@/types";

// Mock invoice data
const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv_001",
    invoiceNumber: "INV-2025-001",
    clientEmail: "sarah@example.com",
    issueDate: "2025-10-01",
    dueDate: "2025-10-31",
    totalAmount: 2500.0,
    status: "Sent",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "inv_002",
    invoiceNumber: "INV-2025-002",
    clientEmail: "sarah@example.com",
    issueDate: "2025-09-15",
    dueDate: "2025-10-15",
    totalAmount: 1800.0,
    status: "Paid",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "inv_003",
    invoiceNumber: "INV-2025-003",
    clientEmail: "michael@techstartup.com",
    issueDate: "2025-08-20",
    dueDate: "2025-09-20",
    totalAmount: 3200.0,
    status: "Overdue",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "inv_004",
    invoiceNumber: "INV-2025-004",
    clientEmail: "michael@techstartup.com",
    issueDate: "2025-10-05",
    dueDate: "2025-11-05",
    totalAmount: 4500.0,
    status: "Sent",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "inv_005",
    invoiceNumber: "INV-2025-005",
    clientEmail: "emily@designco.com",
    issueDate: "2025-09-01",
    dueDate: "2025-10-01",
    totalAmount: 2200.0,
    status: "Paid",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "inv_006",
    invoiceNumber: "INV-2025-006",
    clientEmail: "david@smallbiz.com",
    issueDate: "2025-10-08",
    dueDate: "2025-11-08",
    totalAmount: 1500.0,
    status: "Sent",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "inv_007",
    invoiceNumber: "INV-2025-007",
    clientEmail: "lynae@mattedigital.com",
    issueDate: "2025-10-09",
    dueDate: "2025-11-09",
    totalAmount: 5800.0,
    status: "Sent",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

// Mock line items
const MOCK_LINE_ITEMS: InvoiceLineItem[] = [
  {
    id: "li_001",
    invoiceId: "inv_001",
    description: "Website Design & Development",
    quantity: 1,
    rate: 2500.0,
    amount: 2500.0,
  },
  {
    id: "li_002",
    invoiceId: "inv_002",
    description: "Brand Identity Package",
    quantity: 1,
    rate: 1800.0,
    amount: 1800.0,
  },
  {
    id: "li_003",
    invoiceId: "inv_003",
    description: "UI/UX Design Services",
    quantity: 40,
    rate: 80.0,
    amount: 3200.0,
  },
  {
    id: "li_004",
    invoiceId: "inv_004",
    description: "Full-Stack Web Application",
    quantity: 1,
    rate: 4500.0,
    amount: 4500.0,
  },
  {
    id: "li_005",
    invoiceId: "inv_005",
    description: "Logo Design & Branding",
    quantity: 1,
    rate: 2200.0,
    amount: 2200.0,
  },
  {
    id: "li_006",
    invoiceId: "inv_006",
    description: "Website Maintenance - October",
    quantity: 1,
    rate: 1500.0,
    amount: 1500.0,
  },
];

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  console.log(`📄 [Mock] Fetching invoice with ID: ${id}`);
  await new Promise((r) => setTimeout(r, 300));
  
  const invoice = MOCK_INVOICES.find((inv) => inv.id === id);
  
  if (invoice) {
    console.log(`✅ [Mock] Invoice found:`, invoice);
  } else {
    console.log(`❌ [Mock] Invoice not found for ID: ${id}`);
  }
  
  return invoice || null;
}

export async function getLineItemsByInvoiceId(
  invoiceId: string,
): Promise<InvoiceLineItem[]> {
  console.log(`📋 [Mock] Fetching line items for invoice: ${invoiceId}`);
  await new Promise((r) => setTimeout(r, 300));
  
  const items = MOCK_LINE_ITEMS.filter((item) => item.invoiceId === invoiceId);
  console.log(`✅ [Mock] Found ${items.length} line item(s) for invoice ${invoiceId}`);
  
  return items;
}

export async function getAllInvoicesByEmail(
  email: string,
): Promise<Invoice[]> {
  console.log(`📬 [Mock] Fetching all invoices for email: ${email}`);
  await new Promise((r) => setTimeout(r, 400));
  
  const invoices = MOCK_INVOICES.filter((inv) => inv.clientEmail === email);
  console.log(`✅ [Mock] Found ${invoices.length} invoice(s) for ${email}`);
  
  return invoices;
}

export async function payInvoice(id: string): Promise<Invoice | null> {
  console.log(`💳 [Mock] Processing payment for invoice: ${id}`);
  await new Promise((r) => setTimeout(r, 1500));
  
  const invoice = MOCK_INVOICES.find((inv) => inv.id === id);
  
  if (invoice) {
    invoice.status = "Paid";
    console.log(`✅ [Mock] Payment successful! Invoice ${id} is now marked as Paid`);
    return invoice;
  } else {
    console.log(`❌ [Mock] Payment failed - Invoice ${id} not found`);
    return null;
  }
}


