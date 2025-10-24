"use client"

import { motion } from "motion/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ClientsTab from "@/features/admin/components/tabs/ClientsTab";
import DocumentsTab from "@/features/admin/components/tabs/DocumentsTab";
import InvoicesTab from "@/features/admin/components/tabs/InvoicesTab";
import ProjectsTab from "@/features/admin/components/tabs/ProjectsTab";
import { LogoutButton } from "@/features/auth/components/LogoutButton";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminDashboardContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-16"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 mt-2">
            Manage clients, projects, invoices, and documents
          </p>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="default" className=
            "shadow">
                <Plus className="h-4 w-4" />
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
            <ClientsTab />
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
    </motion.div>
  )
}