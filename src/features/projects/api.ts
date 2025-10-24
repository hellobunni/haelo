import type { Project } from "@/types";

const MOCK_PROJECTS: Project[] = [
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

export async function getProjectsByEmail(email: string): Promise<Project[]> {
  console.log(`🚀 [Mock] Fetching projects for email: ${email}`);
  await new Promise((r) => setTimeout(r, 400));

  const projects = MOCK_PROJECTS.filter((proj) => proj.clientEmail === email);
  console.log(`✅ [Mock] Found ${projects.length} project(s) for ${email}`);

  return projects;
}
