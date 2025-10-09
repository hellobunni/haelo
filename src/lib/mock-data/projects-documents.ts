// Mock data for projects and documents

export type ProjectRecord = {
  id: string;
  projectName: string;
  description: string;
  clientEmail: string;
  status:
    | "Discovery"
    | "Design"
    | "Development"
    | "Testing"
    | "Launch"
    | "Completed";
  progress: number;
  startDate: string;
  estimatedCompletion?: string;
  pdfUrl?: string;
};

export type DocumentRecord = {
  id: string;
  documentName: string;
  documentType: string;
  clientEmail: string;
  uploadDate: string;
  fileUrl: string;
  status: "Pending" | "Viewed" | "Signed";
};

// Mock projects data
const MOCK_PROJECTS: ProjectRecord[] = [
  // Sarah's projects
  {
    id: "proj_001",
    projectName: "E-Commerce Website Redesign",
    description:
      "Complete redesign of the online store with improved UX and mobile optimization",
    clientEmail: "sarah@example.com",
    status: "Development",
    progress: 65,
    startDate: "2025-09-01",
    estimatedCompletion: "2025-11-15",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  // Michael's projects
  {
    id: "proj_002",
    projectName: "SaaS Platform Development",
    description:
      "Building a full-stack SaaS application with user authentication and analytics",
    clientEmail: "michael@techstartup.com",
    status: "Testing",
    progress: 85,
    startDate: "2025-07-15",
    estimatedCompletion: "2025-10-30",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  {
    id: "proj_003",
    projectName: "Mobile App Design",
    description: "UI/UX design for iOS and Android mobile application",
    clientEmail: "michael@techstartup.com",
    status: "Design",
    progress: 40,
    startDate: "2025-10-01",
    estimatedCompletion: "2025-12-01",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  // Emily's projects
  {
    id: "proj_004",
    projectName: "Brand Identity Package",
    description:
      "Complete brand identity including logo, colors, typography, and guidelines",
    clientEmail: "emily@designco.com",
    status: "Completed",
    progress: 100,
    startDate: "2025-08-01",
    estimatedCompletion: "2025-09-15",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
  // Lynae's projects
  {
    id: "proj_005",
    projectName: "Corporate Website Launch",
    description: "New corporate website with CMS integration and analytics",
    clientEmail: "lynae@mattedigital.com",
    status: "Launch",
    progress: 95,
    startDate: "2025-08-15",
    estimatedCompletion: "2025-10-20",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  },
];

// Mock documents data
const MOCK_DOCUMENTS: DocumentRecord[] = [
  // Sarah's documents
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
  // Michael's documents
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
  // Emily's documents
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
  // Lynae's documents
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

export async function getProjectsByEmail(
  email: string,
): Promise<ProjectRecord[]> {
  console.log(`🚀 [Mock] Fetching projects for email: ${email}`);

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 400));

  const projects = MOCK_PROJECTS.filter((proj) => proj.clientEmail === email);

  console.log(`✅ [Mock] Found ${projects.length} project(s) for ${email}`);

  return projects;
}

export async function getDocumentsByEmail(
  email: string,
): Promise<DocumentRecord[]> {
  console.log(`📄 [Mock] Fetching documents for email: ${email}`);

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 400));

  const documents = MOCK_DOCUMENTS.filter((doc) => doc.clientEmail === email);

  console.log(`✅ [Mock] Found ${documents.length} document(s) for ${email}`);

  return documents;
}

export async function updateDocumentStatus(
  id: string,
  status: "Pending" | "Viewed" | "Signed",
): Promise<DocumentRecord | null> {
  console.log(`📝 [Mock] Updating document ${id} status to: ${status}`);

  // Simulate network delay
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
