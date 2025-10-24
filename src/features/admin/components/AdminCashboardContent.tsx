"use client";

import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientsTab from "@/features/admin/components/tabs/ClientsTab";
import DocumentsTab from "@/features/admin/components/tabs/DocumentsTab";
import InvoicesTab from "@/features/admin/components/tabs/InvoicesTab";
import ProjectsTab from "@/features/admin/components/tabs/ProjectsTab";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import AddClientDialog from "./dialogs/AddClientDialog";

export default function AdminDashboardContent() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddClient = async (newClient: any) => {
    console.log("Adding client:", newClient);

    try {
      const response = await fetch("/api/admin/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newClient),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to add client");
      }

      console.log("Client added successfully:", result);
      alert(`✅ ${result.message}`);

      // Refresh the clients list by changing the key
      setRefreshKey((prev) => prev + 1);
    } catch (error) {
      console.error("Error adding client:", error);
      alert(
        `❌ ${error instanceof Error ? error.message : "Failed to add client"}`,
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-16"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-5xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Manage clients, projects, invoices, and documents
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Button>
          <LogoutButton />
        </div>
      </div>

      <Tabs defaultValue="clients" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-8">
          <TabsTrigger value="clients">Clients</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="clients">
          <ClientsTab key={refreshKey} />
        </TabsContent>

        {/* <TabsContent value="clients">
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
        </TabsContent> */}
      </Tabs>
      <AddClientDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddClient}
      />
    </motion.div>
  );
}
