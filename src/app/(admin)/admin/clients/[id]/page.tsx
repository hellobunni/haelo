import { format } from "date-fns";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge/badge";
import { Card, CardContent } from "@/components/ui/card/card";
import { Progress } from "@/components/ui/progress/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table";
import { getClientDetailById } from "@/features/admin/api";
import { InvoiceStatusBadge } from "@/features/invoices/components/InvoiceStatusBadge";
import { AddInvoiceButton } from "./AddInvoiceButton";

interface ClientDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailPage({
  params,
}: ClientDetailPageProps) {
  const { id } = await params;
  const clientData = await getClientDetailById(id);

  if (!clientData) {
    notFound();
  }

  const { client, projects, invoices, documents } = clientData;

  // Calculate total outstanding
  const totalOutstanding = invoices
    .filter((inv) => inv.status === "Sent" || inv.status === "Overdue")
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Back Button */}
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-periwinkle hover:text-periwinkle/80 mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      {/* Client Header */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{client.full_name}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{client.email}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 mb-1">Total Outstanding</p>
              <p className="text-3xl font-bold text-red-600">
                $
                {totalOutstanding.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
              <div className="flex gap-4 mt-2 text-sm text-gray-600">
                <span>{projects.length} Projects</span>
                <span>{invoices.length} Invoices</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="space-y-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        {project.projectName}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {project.description}
                      </p>
                    </div>
                    <Badge className={getProjectStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium">
                        {project.progress}%
                      </span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <div className="flex gap-8 text-sm">
                    <div>
                      <span className="text-gray-600">Started: </span>
                      <span className="font-medium">
                        {format(new Date(project.startDate), "MMM d, yyyy")}
                      </span>
                    </div>
                    {project.estimatedCompletion && (
                      <div>
                        <span className="text-gray-600">Est. Completion: </span>
                        <span className="font-medium">
                          {format(
                            new Date(project.estimatedCompletion),
                            "MMM d, yyyy",
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-gray-500">
                No projects found
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Invoices Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold mb-4">Invoices</h2>

          {/* Add Invoice Button */}
          <AddInvoiceButton />
        </div>
        <Card>
          <CardContent className="pt-6">
            {invoices.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice #</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={`/invoices/${invoice.id}`}
                          className="text-periwinkle hover:underline"
                        >
                          {invoice.invoiceNumber}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {format(new Date(invoice.issueDate), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        {format(new Date(invoice.dueDate), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        $
                        {invoice.totalAmount.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell>
                        <InvoiceStatusBadge status={invoice.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-8 text-center text-gray-500">
                No invoices found
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Documents Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Documents</h2>
        <Card>
          <CardContent className="pt-6">
            {documents.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell className="font-medium">
                        {document.documentName}
                      </TableCell>
                      <TableCell>{document.documentType}</TableCell>
                      <TableCell>
                        {format(new Date(document.uploadDate), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getDocumentStatusColor(document.status)}
                        >
                          {document.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <a
                          href={document.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-periwinkle hover:underline"
                        >
                          Download
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-8 text-center text-gray-500">
                No documents found
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// Helper functions for status colors
function getProjectStatusColor(status: string) {
  switch (status) {
    case "Completed":
      return "bg-green-500/20 text-green-600";
    case "Development":
      return "bg-orange-500/20 text-orange-600";
    case "Design":
      return "bg-purple-500/20 text-purple-600";
    case "Testing":
      return "bg-blue-500/20 text-blue-600";
    default:
      return "bg-gray-500/20 text-gray-600";
  }
}

function getDocumentStatusColor(status: string) {
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
}
