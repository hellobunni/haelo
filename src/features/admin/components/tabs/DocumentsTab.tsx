"use client";

import { format } from "date-fns";
import { Edit, Eye, File, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card/card";
import { Skeleton } from "@/components/ui/skeleton/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip/tooltip";
import { getAllDocuments } from "@/features/admin/api";
import type { Document } from "@/types";
import EditDocumentDialog from "../dialogs/EditDocumentDialog";
import PdfUploadDialog from "../dialogs/PdfUploadDialog";
import PdfViewer from "../dialogs/PdfViewer";

export default function DocumentsTab() {
  const [documents, setDocuments] = useState<
    (Document & { clientName: string })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [selectedDocumentPdf, setSelectedDocumentPdf] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<
    (Document & { clientName: string }) | null
  >(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await getAllDocuments();
        // Sort by upload date descending
        data.sort(
          (a, b) =>
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime(),
        );
        setDocuments(data);
      } catch (error) {
        console.error("Error fetching documents:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

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

  const handleDocumentView = (doc: Document & { clientName: string }) => {
    if (doc.fileUrl) {
      setSelectedDocumentPdf({
        url: doc.fileUrl,
        title: `${doc.documentName} - ${doc.clientName}`,
      });
      setPdfViewerOpen(true);
    }
  };

  const handleUploadPdf = (doc: Document & { clientName: string }) => {
    setSelectedDocument(doc);
    setUploadDialogOpen(true);
  };

  const handleEdit = (doc: Document & { clientName: string }) => {
    setSelectedDocument(doc);
    setEditDialogOpen(true);
  };

  const handlePdfUpload = (_file: File, url: string) => {
    if (selectedDocument) {
      const updatedDocuments = documents.map((doc) =>
        doc.id === selectedDocument.id ? { ...doc, fileUrl: url } : doc,
      );
      setDocuments(updatedDocuments);
      console.log(
        `📄 PDF uploaded for document ${selectedDocument.documentName}:`,
        url,
      );
    }
  };

  const handleSaveDocument = (
    updatedDocument: Document & { clientName: string },
  ) => {
    const updatedDocuments = documents.map((doc) =>
      doc.id === updatedDocument.id ? updatedDocument : doc,
    );
    setDocuments(updatedDocuments);
    console.log(`✅ Document ${updatedDocument.documentName} updated`);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <File className="h-5 w-5" />
              <Skeleton className="h-6 w-32" />
            </CardTitle>
            <Skeleton className="h-9 w-28" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, i) => i).map((idx) => (
              <div
                key={`skeleton-document-${idx}`}
                className="flex items-center gap-4 py-3 border-b"
              >
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <File className="h-5 w-5" />
            All Documents ({documents.length})
          </CardTitle>
          <Button
            onClick={() => {
              setSelectedDocument(null);
              setUploadDialogOpen(true);
            }}
            size="sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            New Document
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {documents.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell className="font-medium">
                    {doc.documentName}
                  </TableCell>
                  <TableCell>{doc.clientName}</TableCell>
                  <TableCell>{doc.documentType}</TableCell>
                  <TableCell>
                    {format(new Date(doc.uploadDate), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={getDocumentStatusColor(doc.status)}>
                      {doc.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDocumentView(doc)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View PDF</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleUploadPdf(doc)}
                          >
                            <Upload className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Upload/Replace PDF</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(doc)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Edit Document</TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
            <File className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No documents found
            </h3>
          </div>
        )}
      </CardContent>

      {/* PDF Viewer Dialog */}
      {selectedDocumentPdf && (
        <PdfViewer
          isOpen={pdfViewerOpen}
          onClose={() => {
            setPdfViewerOpen(false);
            setSelectedDocumentPdf(null);
          }}
          pdfUrl={selectedDocumentPdf.url}
          title={selectedDocumentPdf.title}
        />
      )}

      {/* PDF Upload Dialog */}
      <PdfUploadDialog
        isOpen={uploadDialogOpen}
        onClose={() => {
          setUploadDialogOpen(false);
          setSelectedDocument(null);
        }}
        onUpload={handlePdfUpload}
        title={
          selectedDocument
            ? `Upload PDF for ${selectedDocument.documentName}`
            : "Upload New Document"
        }
        existingUrl={selectedDocument?.fileUrl}
      />

      {/* Edit Document Dialog */}
      <EditDocumentDialog
        isOpen={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedDocument(null);
        }}
        document={selectedDocument}
        onSave={handleSaveDocument}
      />
    </Card>
  );
}
