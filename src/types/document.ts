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
  documentName: string;
  documentType: DocumentType;
  clientEmail: string;
  uploadDate: string;
  fileUrl: string;
  status: DocumentStatus;
}

// Extended type with client info for admin views
export interface DocumentWithClient extends Document {
  clientName: string;
}
