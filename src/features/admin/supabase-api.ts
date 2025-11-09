import { createClient } from "@/lib/supabase/server";
import type { Document, Invoice, Project, User } from "@/types";

export interface ClientDetailData {
  client: ClientWithData;
  projects: Project[];
  invoices: Invoice[];
  documents: Document[];
}

export interface ClientWithData extends User {
  invoiceCount: number;
  projectCount: number;
  documentCount: number;
  totalSpent: number;
}

/**
 * Fetch all clients with their aggregated data from Supabase
 * Only admins should call this function
 */
export async function getAllClientsWithDataFromSupabase(): Promise<
  ClientWithData[]
> {
  console.log("👥 [Supabase] Fetching all clients with their data...");

  const supabase = await createClient();

  // Fetch all users with role 'client'
  const { data: clients, error: clientsError } = await supabase
    .from("users")
    .select("*")
    .eq("role", "client")
    .order("created_at", { ascending: false });

  if (clientsError) {
    console.error("❌ [Supabase] Error fetching clients:", clientsError);
    throw new Error(`Failed to fetch clients: ${clientsError.message}`);
  }

  if (!clients || clients.length === 0) {
    console.log("✅ [Supabase] No clients found");
    return [];
  }

  // Fetch aggregated data for each client
  const clientsWithData = await Promise.all(
    clients.map(async (client) => {
      // Count projects by client_id
      const { count: projectCount, error: projectError } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true })
        .eq("client_id", client.id);

      // Count invoices and calculate total spent by client_id
      const { data: invoices, error: invoiceError } = await supabase
        .from("invoices")
        .select("total_amount, status")
        .eq("client_id", client.id);

      // Count documents by client_id
      const { count: documentCount, error: documentError } = await supabase
        .from("documents")
        .select("*", { count: "exact", head: true })
        .eq("client_id", client.id);

      if (projectError) {
        console.error(
          `⚠️  [Supabase] Error fetching projects for ${client.email}:`,
          projectError,
        );
      }
      if (invoiceError) {
        console.error(
          `⚠️  [Supabase] Error fetching invoices for ${client.email}:`,
          invoiceError,
        );
      }
      if (documentError) {
        console.error(
          `⚠️  [Supabase] Error fetching documents for ${client.email}:`,
          documentError,
        );
      }

      const totalSpent =
        invoices
          ?.filter((inv) => inv.status === "Paid")
          .reduce((sum, inv) => sum + Number(inv.total_amount), 0) || 0;

      return {
        id: client.id,
        email: client.email,
        password: "", // Never expose
        full_name: client.full_name,
        role: client.role as "admin" | "client",
        company: client.company,
        phone: client.phone,
        stripe_customer_id: client.stripe_customer_id,
        createdAt: client.created_at,
        updatedAt: client.updated_at,
        projectCount: projectCount || 0,
        invoiceCount: invoices?.length || 0,
        documentCount: documentCount || 0,
        totalSpent,
      };
    }),
  );

  console.log(`✅ [Supabase] Found ${clientsWithData.length} clients`);
  return clientsWithData;
}

/**
 * Fetch all projects with client information from Supabase
 * Only admins should call this function
 */
export async function getAllProjectsFromSupabase() {
  console.log("🚀 [Supabase] Fetching all projects with client data...");

  const supabase = await createClient();

  // Fetch all projects with their associated client information
  const { data: projects, error } = await supabase
    .from("projects")
    .select(`
      id,
      project_name,
      description,
      status,
      progress,
      start_date,
      estimated_completion,
      pdf_url,
      created_at,
      updated_at,
      client_id,
      users:client_id (
        id,
        full_name,
        email,
        company
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ [Supabase] Error fetching projects:", error);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }

  if (!projects || projects.length === 0) {
    console.log("✅ [Supabase] No projects found");
    return [];
  }

  // Transform the data to match the expected format
  const formattedProjects = projects.map((project) => {
    const user = Array.isArray(project.users)
      ? project.users[0]
      : project.users;
    return {
      id: project.id,
      projectName: project.project_name,
      description: project.description || "",
      clientId: project.client_id,
      clientEmail: user?.email || "",
      clientName: user?.full_name || "Unknown Client",
      status: project.status,
      progress: project.progress,
      startDate: project.start_date,
      estimatedCompletion: project.estimated_completion,
      pdfUrl: project.pdf_url,
      createdAt: project.created_at,
      updatedAt: project.updated_at,
    };
  });

  console.log(`✅ [Supabase] Found ${formattedProjects.length} projects`);
  return formattedProjects;
}

export async function getClientDetailByIdFromSupabase(
  clientId: string,
): Promise<ClientDetailData | null> {
  console.log(`👤 [Supabase] Fetching client details for ID: ${clientId}`);

  const supabase = await createClient();

  // Fetch client
  const { data: client, error: clientError } = await supabase
    .from("users")
    .select("*")
    .eq("id", clientId)
    .eq("role", "client")
    .single();

  if (clientError || !client) {
    console.error("❌ [Supabase] Error fetching client:", clientError);
    return null;
  }

  // Fetch projects
  const { data: projectsData, error: projectsError } = await supabase
    .from("projects")
    .select("*")
    .eq("client_id", clientId)
    .order("created_at", { ascending: false });

  // Fetch invoices
  const { data: invoicesData, error: invoicesError } = await supabase
    .from("invoices")
    .select("*")
    .eq("client_id", clientId)
    .order("issue_date", { ascending: false });

  // Fetch documents
  const { data: documentsData, error: documentsError } = await supabase
    .from("documents")
    .select("*")
    .eq("client_id", clientId)
    .order("upload_date", { ascending: false });

  if (projectsError) console.error("⚠️ Error fetching projects:", projectsError);
  if (invoicesError) {
    console.error("⚠️ Error fetching invoices:", invoicesError);
  } else {
    console.log(
      `📄 Found ${invoicesData?.length || 0} invoices for client ${clientId}`,
    );
    console.log("Invoice data:", invoicesData);
  }
  if (documentsError)
    console.error("⚠️ Error fetching documents:", documentsError);

  // Transform projects
  const projects: Project[] = (projectsData || []).map((p) => ({
    id: p.id,
    projectName: p.project_name,
    description: p.description || "",
    clientEmail: client.email,
    status: p.status,
    progress: p.progress,
    startDate: p.start_date,
    estimatedCompletion: p.estimated_completion,
    pdfUrl: p.pdf_url,
  }));

  // Transform invoices
  const invoices: Invoice[] = (invoicesData || []).map((inv) => ({
    id: inv.id,
    invoiceNumber: inv.invoice_number,
    clientEmail: client.email,
    issueDate: inv.issue_date,
    dueDate: inv.due_date,
    totalAmount: Number(inv.total_amount),
    status: inv.status,
    pdfUrl: inv.pdf_url,
  }));

  // Transform documents
  // Transform documents - update to match actual schema
  const documents: Document[] = (documentsData || []).map((doc) => ({
    id: doc.id,
    documentName: doc.title, // ✅ Changed from doc.document_name to doc.title
    documentType: doc.document_type,
    clientEmail: client.email,
    uploadDate: doc.upload_date,
    fileUrl: doc.file_url,
    status: doc.status,
  }));

  const totalSpent = invoices
    .filter((inv) => inv.status === "Paid")
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  const clientWithData: ClientWithData = {
    id: client.id,
    email: client.email,
    password: "",
    full_name: client.full_name,
    role: client.role,
    company: client.company,
    phone: client.phone,
    stripe_customer_id: client.stripe_customer_id,
    createdAt: client.created_at,
    updatedAt: client.updated_at,
    projectCount: projects.length,
    invoiceCount: invoices.length,
    documentCount: documents.length,
    totalSpent,
  };

  console.log(`✅ [Supabase] Client details fetched successfully`);

  return {
    client: clientWithData,
    projects,
    invoices,
    documents,
  };
}
