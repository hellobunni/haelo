import { MOCK_USERS, type MockUser } from "./users";
import { getAllInvoicesByEmail, type InvoiceRecord } from "../invoices";
import {
  getProjectsByEmail,
  getDocumentsByEmail,
  type ProjectRecord,
  type DocumentRecord,
} from "./projects-documents";

export interface ClientWithData extends MockUser {
  invoiceCount: number;
  projectCount: number;
  documentCount: number;
  totalSpent: number;
}

export async function getAllClientsWithData(): Promise<ClientWithData[]> {
  console.log("👥 [Mock Admin] Fetching all clients with their data...");

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 500));

  const clients = MOCK_USERS.filter((user) => user.role === "client");

  const clientsWithData = await Promise.all(
    clients.map(async (client) => {
      const [invoices, projects, documents] = await Promise.all([
        getAllInvoicesByEmail(client.email),
        getProjectsByEmail(client.email),
        getDocumentsByEmail(client.email),
      ]);

      const totalSpent = invoices
        .filter((inv) => inv.status === "Paid")
        .reduce((sum, inv) => sum + inv.totalAmount, 0);

      return {
        ...client,
        invoiceCount: invoices.length,
        projectCount: projects.length,
        documentCount: documents.length,
        totalSpent,
      };
    }),
  );

  console.log(`✅ [Mock Admin] Found ${clientsWithData.length} clients`);
  return clientsWithData;
}

export async function getAllProjects(): Promise<
  (ProjectRecord & { clientName: string })[]
> {
  console.log("🚀 [Mock Admin] Fetching all projects...");

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 400));

  const allProjects: (ProjectRecord & { clientName: string })[] = [];

  for (const user of MOCK_USERS) {
    if (user.role === "client") {
      const projects = await getProjectsByEmail(user.email);
      projects.forEach((project) => {
        allProjects.push({
          ...project,
          clientName: user.full_name,
        });
      });
    }
  }

  console.log(`✅ [Mock Admin] Found ${allProjects.length} projects`);
  return allProjects;
}

export async function getAllDocuments(): Promise<
  (DocumentRecord & { clientName: string })[]
> {
  console.log("📄 [Mock Admin] Fetching all documents...");

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 400));

  const allDocuments: (DocumentRecord & { clientName: string })[] = [];

  for (const user of MOCK_USERS) {
    if (user.role === "client") {
      const documents = await getDocumentsByEmail(user.email);
      documents.forEach((document) => {
        allDocuments.push({
          ...document,
          clientName: user.full_name,
        });
      });
    }
  }

  console.log(`✅ [Mock Admin] Found ${allDocuments.length} documents`);
  return allDocuments;
}

export async function getAllInvoices(): Promise<
  (InvoiceRecord & { clientName: string })[]
> {
  console.log("💰 [Mock Admin] Fetching all invoices...");

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 400));

  const allInvoices: (InvoiceRecord & { clientName: string })[] = [];

  for (const user of MOCK_USERS) {
    if (user.role === "client") {
      const invoices = await getAllInvoicesByEmail(user.email);
      invoices.forEach((invoice) => {
        allInvoices.push({
          ...invoice,
          clientName: user.full_name,
        });
      });
    }
  }

  console.log(`✅ [Mock Admin] Found ${allInvoices.length} invoices`);
  return allInvoices;
}
