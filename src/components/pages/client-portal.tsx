"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import Link from "next/link";
import { format } from "date-fns";
import { getAllInvoicesByEmail } from "@/lib/invoices";
import { getProjectsByEmail, getDocumentsByEmail, updateDocumentStatus, type ProjectRecord, type DocumentRecord } from "@/lib/mock-data/projects-documents";
import { getCurrentMockUser, mockLogout, type MockUser } from "@/lib/mock-data/users";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, FileText, Loader2, Download, Rocket, File } from "lucide-react";

interface PortalInvoice {
  id: string;
  invoiceNumber: string;
  issueDate: string | Date;
  dueDate: string | Date;
  totalAmount: number;
  status: "Paid" | "Sent" | "Overdue" | "Draft";
  pdfUrl?: string;
}

export default function ClientPortalPage() {
  const router = useRouter();
  const [user, setUser] = useState<MockUser | null>(null);
  const [invoices, setInvoices] = useState<PortalInvoice[]>([]);
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAndFetchData = async () => {
      try {
        console.log("🔐 [Mock] Checking user authentication...");
        
        const currentUser = getCurrentMockUser();
        
        if (!currentUser) {
          console.log("❌ [Mock] User not authenticated, redirecting to login...");
          router.push("/login");
          return;
        }

        console.log("✅ [Mock] User authenticated:", currentUser);
        setUser(currentUser);
        
        // Fetch all data in parallel
        const [userInvoices, userProjects, userDocuments] = await Promise.all([
          getAllInvoicesByEmail(currentUser.email),
          getProjectsByEmail(currentUser.email),
          getDocumentsByEmail(currentUser.email)
        ]);
        
        setInvoices(userInvoices);
        setProjects(userProjects);
        setDocuments(userDocuments);
      } catch (error) {
        console.error("❌ [Mock] Error loading portal:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    
    void checkUserAndFetchData();
  }, [router]);

  const handleLogout = () => {
    mockLogout();
    setUser(null);
    setInvoices([]);
    setProjects([]);
    setDocuments([]);
    router.push("/login");
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500/20 text-green-600";
      case "Sent":
        return "bg-blue-500/20 text-blue-600";
      case "Overdue":
        return "bg-red-500/20 text-red-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case "Discovery":
        return "bg-purple-500/20 text-purple-600";
      case "Design":
        return "bg-blue-500/20 text-blue-600";
      case "Development":
        return "bg-orange-500/20 text-orange-600";
      case "Testing":
        return "bg-yellow-500/20 text-yellow-600";
      case "Launch":
        return "bg-pink-500/20 text-pink-600";
      case "Completed":
        return "bg-green-500/20 text-green-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  const getDocumentStatusColor = (status: string) => {
    switch (status) {
      case "Signed":
        return "bg-green-500/20 text-green-600";
      case "Viewed":
        return "bg-blue-500/20 text-blue-600";
      case "Pending":
        return "bg-yellow-500/20 text-yellow-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  const handleDocumentView = async (doc: DocumentRecord) => {
    window.open(doc.fileUrl, "_blank");
    
    // Update status if it was pending
    if (doc.status === "Pending" && user) {
      await updateDocumentStatus(doc.id, "Viewed");
      // Refresh documents
      const updatedDocs = await getDocumentsByEmail(user.email);
      setDocuments(updatedDocs);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-periwinkle" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Client Portal</h1>
          <p className="text-gray-500">Welcome back, {user.full_name}.</p>
          <p className="text-sm text-gray-400">{user.email}</p>
        </div>
        <Button variant="outline" onClick={handleLogout}>
          Logout
        </Button>
      </div>

      {/* Projects Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Your Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{project.projectName}</h3>
                      <p className="text-gray-600 text-sm">{project.description}</p>
                    </div>
                    <Badge className={getProjectStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Progress</span>
                      <span className="font-medium">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Started:</span>
                      <p className="font-medium">{format(new Date(project.startDate), "MMM d, yyyy")}</p>
                    </div>
                    {project.estimatedCompletion && (
                      <div>
                        <span className="text-gray-500">Est. Completion:</span>
                        <p className="font-medium">{format(new Date(project.estimatedCompletion), "MMM d, yyyy")}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
              <Rocket className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No projects yet</h3>
              <p className="mt-1 text-sm text-gray-500">Your projects will appear here once they're created.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Documents Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <File className="h-5 w-5" />
            Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          {documents.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Document Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id}>
                    <TableCell className="font-medium">{doc.documentName}</TableCell>
                    <TableCell>{doc.documentType}</TableCell>
                    <TableCell>{format(new Date(doc.uploadDate), "MMM d, yyyy")}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={getDocumentStatusColor(doc.status)}>{doc.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDocumentView(doc)}
                        aria-label={`View ${doc.documentName}`}
                        title="View Document"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
              <File className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No documents yet</h3>
              <p className="mt-1 text-sm text-gray-500">Your documents will appear here once they're uploaded.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoices Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Your Invoices
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invoices.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Invoice #</th>
                    <th className="text-left py-3 px-4">Issue Date</th>
                    <th className="text-left py-3 px-4">Due Date</th>
                    <th className="text-right py-3 px-4">Amount</th>
                    <th className="text-center py-3 px-4">Status</th>
                    <th className="text-right py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{invoice.invoiceNumber}</td>
                      <td className="py-3 px-4">
                        {format(new Date(invoice.issueDate), "MMM d, yyyy")}
                      </td>
                      <td className="py-3 px-4">
                        {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                      </td>
                      <td className="text-right py-3 px-4">
                        ${invoice.totalAmount.toFixed(2)}
                      </td>
                      <td className="text-center py-3 px-4">
                        <Badge className={getStatusClass(invoice.status)}>
                          {invoice.status}
                        </Badge>
                      </td>
                      <td className="text-right py-3 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <Link href={`/invoices/${invoice.id}`}>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              aria-label={`View invoice ${invoice.invoiceNumber}`}
                              title="View Invoice"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          {invoice.pdfUrl && (
                            <a
                              href={invoice.pdfUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => console.log(`📄 [Mock] Opening PDF for ${invoice.invoiceNumber}`)}
                            >
                              <Button 
                                variant="ghost" 
                                size="icon"
                                aria-label={`Download PDF for ${invoice.invoiceNumber}`}
                                title="Download PDF"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No invoices found
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                You currently do not have any invoices.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}