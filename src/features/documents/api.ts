import type { Document } from "@/types";

const MOCK_DOCUMENTS: Document[] = [
  {
    id: "doc_001",
    documentName: "Website Redesign Proposal",
    documentType: "Proposal",
    clientEmail: "sarah@example.com",
    uploadDate: "2025-08-25",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    status: "Signed",
  },
  {
    id: "doc_002",
    documentName: "Project Contract - 2025",
    documentType: "Contract",
    clientEmail: "sarah@example.com",
    uploadDate: "2025-09-01",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    status: "Signed",
  },
  {
    id: "doc_003",
    documentName: "SaaS Development Agreement",
    documentType: "Contract",
    clientEmail: "michael@techstartup.com",
    uploadDate: "2025-07-10",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    status: "Signed",
  },
  {
    id: "doc_004",
    documentName: "Mobile App Design Brief",
    documentType: "Brief",
    clientEmail: "michael@techstartup.com",
    uploadDate: "2025-09-28",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    status: "Viewed",
  },
  {
    id: "doc_005",
    documentName: "Q4 Progress Report",
    documentType: "Report",
    clientEmail: "michael@techstartup.com",
    uploadDate: "2025-10-05",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    status: "Pending",
  },
  {
    id: "doc_006",
    documentName: "Brand Guidelines Final",
    documentType: "Deliverable",
    clientEmail: "emily@designco.com",
    uploadDate: "2025-09-15",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    status: "Signed",
  },
  {
    id: "doc_007",
    documentName: "Website Launch Checklist",
    documentType: "Document",
    clientEmail: "lynae@mattedigital.com",
    uploadDate: "2025-10-08",
    fileUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    status: "Viewed",
  },
];

export async function getDocumentsByEmail(email: string): Promise<Document[]> {
  console.log(`📄 [Mock] Fetching documents for email: ${email}`);
  await new Promise((r) => setTimeout(r, 400));
  
  const documents = MOCK_DOCUMENTS.filter((doc) => doc.clientEmail === email);
  console.log(`✅ [Mock] Found ${documents.length} document(s) for ${email}`);
  
  return documents;
}

export async function updateDocumentStatus(
  id: string,
  status: Document["status"],
): Promise<Document | null> {
  console.log(`📝 [Mock] Updating document ${id} status to: ${status}`);
  await new Promise((r) => setTimeout(r, 300));
  
  const document = MOCK_DOCUMENTS.find((doc) => doc.id === id);
  
  if (document) {
    document.status = status;
    console.log(`✅ [Mock] Document ${id} status updated to ${status}`);
    return document;
  } else {
    console.log(`❌ [Mock] Document ${id} not found`);
    return null;
  }
}


