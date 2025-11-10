"use client";

import { AlertCircle, Loader2, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ClientWithData } from "@/features/admin/api";

// NEW: We'll fetch via a client-accessible API route
async function fetchClientsData(): Promise<ClientWithData[]> {
  const response = await fetch("/api/admin/clients");
  if (!response.ok) {
    throw new Error("Failed to fetch clients");
  }
  return response.json();
}

export default function ClientsTab() {
  const [clients, setClients] = useState<ClientWithData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await fetchClientsData();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch clients",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <Skeleton className="h-6 w-32" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`skeleton-client-${i}`}
                className="flex items-center gap-4 py-3 border-b"
              >
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="py-16">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error loading clients</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          All Clients ({clients.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {clients.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-center">Projects</TableHead>
                <TableHead className="text-center">Invoices</TableHead>
                <TableHead className="text-center">Documents</TableHead>
                <TableHead className="text-right">Total Paid</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow
                  key={client.id}
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => router.push(`/admin/clients/${client.id}`)}
                >
                  <TableCell className="font-medium">
                    {client.full_name}
                  </TableCell>
                  {/* ... rest of the cells remain the same ... */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No clients found
            </h3>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
