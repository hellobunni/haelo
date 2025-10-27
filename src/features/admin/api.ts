import { getDocumentsByEmail } from "@/features/documents/api";
import { getAllInvoicesByEmail } from "@/features/invoices/api";
import { getProjectsByEmail } from "@/features/projects/api";
import { MOCK_USERS } from "@/lib/api/mock/users";
import type {
  DocumentWithClient,
  InvoiceWithClient,
  ProjectWithClient,
} from "@/types";

// NEW: Import Supabase function
import {
  type ClientWithData,
  getAllClientsWithDataFromSupabase,
} from "./supabase-api";

export type { ClientWithData } from "./supabase-api";

// Toggle between mock and real data
const USE_SUPABASE = true; // Set to true to use Supabase, false to use mock data

export async function getAllClientsWithData(): Promise<ClientWithData[]> {
  if (USE_SUPABASE) {
    return getAllClientsWithDataFromSupabase();
  }

  // Mock data fallback (existing code)
  console.log("👥 [Mock Admin] Fetching all clients with their data...");
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

// Keep your existing getAllProjects, getAllDocuments, getAllInvoices functions...
export async function getAllProjects(): Promise<ProjectWithClient[]> {
  if (USE_SUPABASE) {
    const { getAllProjectsFromSupabase } = await import("./supabase-api");
    return getAllProjectsFromSupabase();
  }

  // Mock data fallback
  console.log("🚀 [Mock Admin] Fetching all projects...");
  await new Promise((r) => setTimeout(r, 400));

  const allProjects: ProjectWithClient[] = [];

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

export async function getAllDocuments(): Promise<DocumentWithClient[]> {
  console.log("📄 [Mock Admin] Fetching all documents...");
  await new Promise((r) => setTimeout(r, 400));

  const allDocuments: DocumentWithClient[] = [];

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

export async function getAllInvoices(): Promise<InvoiceWithClient[]> {
  console.log("💰 [Mock Admin] Fetching all invoices...");
  await new Promise((r) => setTimeout(r, 400));

  const allInvoices: InvoiceWithClient[] = [];

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
