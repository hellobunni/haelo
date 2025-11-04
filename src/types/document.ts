export type DocumentStatus = "Pending" | "Viewed" | "Signed";

export type DocumentType =
  | "Proposal"
  | "Contract"
  | "Brief"
  | "Report"
  | "Deliverable"
  | "Document";

export interface Document {
  id: string;
  documentName: string; // Maps to "title" in DB
  documentType: DocumentType;
  clientEmail: string; // Derived from client_id join
  uploadDate: string;
  fileUrl: string; // Maps to "file_url" in DB
  status: DocumentStatus;
  // Optional: add these if you want to use them
  fileSize?: number;
  fileType?: string;
  projectId?: string;
}
// Extended type with client info for admin views
export interface DocumentWithClient extends Document {
  clientName: string;
}
