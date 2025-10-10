"use client";

import { Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentMockUser } from "@/lib/api/mock/users";
import type { MockUser } from "@/types";
import ClientsTab from "@/features/admin/components/tabs/ClientsTab";
import DocumentsTab from "@/features/admin/components/tabs/DocumentsTab";
import InvoicesTab from "@/features/admin/components/tabs/InvoicesTab";
import ProjectsTab from "@/features/admin/components/tabs/ProjectsTab";

export default function AdminDashboard() {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Just get the user, layout already checked auth
    const currentUser = getCurrentMockUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-periwinkle" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-16"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Manage clients, projects, invoices, and documents
        </p>
      </div>

      <Tabs defaultValue="clients" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-8">
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="clients">
          <ClientsTab />
        </TabsContent>

        <TabsContent value="projects">
          <ProjectsTab />
        </TabsContent>

        <TabsContent value="invoices">
          <InvoicesTab />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
