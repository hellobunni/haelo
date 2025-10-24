import { createClient as createServerClient } from '@/lib/supabase/server'
import type { User } from '@/types'

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
export async function getAllClientsWithDataFromSupabase(): Promise<ClientWithData[]> {
  console.log("👥 [Supabase] Fetching all clients with their data...");
  
  const supabase = await createServerClient();
  
  // Fetch all users with role 'client'
  const { data: clients, error: clientsError } = await supabase
    .from('users')
    .select('*')
    .eq('role', 'client')
    .order('created_at', { ascending: false });

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
        .from('projects')
        .select('*', { count: 'exact', head: true })
        .eq('client_id', client.id);

      // Count invoices and calculate total spent by client_id
      const { data: invoices, error: invoiceError } = await supabase
        .from('invoices')
        .select('total_amount, status')
        .eq('client_id', client.id);

      // Count documents by client_id
      const { count: documentCount, error: documentError } = await supabase
        .from('documents')
        .select('*', { count: 'exact', head: true })
        .eq('client_id', client.id);

      if (projectError) {
        console.error(`⚠️  [Supabase] Error fetching projects for ${client.email}:`, projectError);
      }
      if (invoiceError) {
        console.error(`⚠️  [Supabase] Error fetching invoices for ${client.email}:`, invoiceError);
      }
      if (documentError) {
        console.error(`⚠️  [Supabase] Error fetching documents for ${client.email}:`, documentError);
      }

      const totalSpent = invoices
        ?.filter((inv) => inv.status === 'Paid')
        .reduce((sum, inv) => sum + Number(inv.total_amount), 0) || 0;

      return {
        id: client.id,
        email: client.email,
        password: '', // Never expose
        full_name: client.full_name,
        role: client.role as 'admin' | 'client',
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
    })
  );

  console.log(`✅ [Supabase] Found ${clientsWithData.length} clients`);
  return clientsWithData;
}