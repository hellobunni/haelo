"use client";

import React, { useState, useEffect } from "react";
import { getAllDocuments } from "@/lib/mock-data/admin";
import type { DocumentRecord } from "@/lib/mock-data/projects-documents";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, File, Eye, Edit, Upload } from "lucide-react";
import { format } from "date-fns";
import PdfViewer from "./PdfViewer";
import PdfUploadDialog from "./PdfUploadDialog";
import EditDocumentDialog from "./EditDocumentDialog";

export default function DocumentsTab() {
  const [documents, setDocuments] = useState<
    (DocumentRecord & { clientName: string })[]
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
    (DocumentRecord & { clientName: string }) | null
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

  const handleDocumentView = (doc: DocumentRecord & { clientName: string }) => {
    if (doc.fileUrl) {
      setSelectedDocumentPdf({
        url: doc.fileUrl,
        title: `${doc.documentName} - ${doc.clientName}`,
      });
      setPdfViewerOpen(true);
    }
  };

  const handleUploadPdf = (doc: DocumentRecord & { clientName: string }) => {
    setSelectedDocument(doc);
    setUploadDialogOpen(true);
  };

  const handleEdit = (doc: DocumentRecord & { clientName: string }) => {
    setSelectedDocument(doc);
    setEditDialogOpen(true);
  };

  const handlePdfUpload = (file: File, url: string) => {
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
    updatedDocument: DocumentRecord & { clientName: string },
  ) => {
    const updatedDocuments = documents.map((doc) =>
      doc.id === updatedDocument.id ? updatedDocument : doc,
    );
    setDocuments(updatedDocuments);
    console.log(`✅ Document ${updatedDocument.documentName} updated`);
  };

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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDocumentView(doc)}
                        title="View PDF"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleUploadPdf(doc)}
                        title="Upload/Replace PDF"
                      >
                        <Upload className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(doc)}
                        title="Edit Document"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
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
