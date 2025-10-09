"use client";

import React, { useState, useEffect } from "react";
import { getAllClientsWithData, type ClientWithData } from "@/lib/mock-data/admin";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Users } from "lucide-react";
import { format } from "date-fns";

export default function ClientsTab() {
  const [clients, setClients] = useState<ClientWithData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const data = await getAllClientsWithData();
        setClients(data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchClients();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <Loader2 className="h-8 w-8 animate-spin text-periwinkle" />
      </div>
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
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.full_name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{client.projectCount}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{client.invoiceCount}</Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline">{client.documentCount}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    ${client.totalSpent.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {format(new Date(client.created_date), "MMM d, yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No clients found</h3>
          </div>
        )}
      </CardContent>
    </Card>
  );
}