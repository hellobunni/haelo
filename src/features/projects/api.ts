import type { Project } from "@/types";

const MOCK_PROJECTS: Project[] = [
  {
    id: "proj_001",
    projectName: "Fanatics",
    description:
      "Collaborated with Fanatics’ in-house team to rebuild core components in React and Tailwind, creating a unified e-commerce design system across multiple sports brand storefronts.",
    clientEmail: "product@fanatics.com",
    status: "Development",
    progress: 78,
    startDate: "2025-08-12",
    estimatedCompletion: "2025-11-22",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/fanatics.pdf",
  },
  {
    id: "proj_002",
    projectName: "The Red Tent",
    description:
      "Complete Shopify redesign for The Red Tent’s wellness brand. Focused on immersive storytelling, brand color elevation, and smoother mobile checkouts for better conversion.",
    clientEmail: "hello@theredtent.co",
    status: "Design",
    progress: 62,
    startDate: "2025-09-05",
    estimatedCompletion: "2025-12-10",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/redtent.pdf",
  },
  {
    id: "proj_003",
    projectName: "Qualigence",
    description:
      "Redesigned the corporate site for Qualigence International to modernize their digital presence. Implemented CMS integration, SEO-ready pages, and a refreshed visual identity.",
    clientEmail: "marketing@qualigence.com",
    status: "Testing",
    progress: 90,
    startDate: "2025-07-20",
    estimatedCompletion: "2025-10-30",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/qualigence.pdf",
  },
  {
    id: "proj_004",
    projectName: "StockX",
    description:
      "Partnered with StockX’s product team to refine their internal analytics dashboard. Enhanced usability, improved load times, and introduced periwinkle-accented dark mode themes.",
    clientEmail: "ux@stockx.com",
    status: "Launch",
    progress: 98,
    startDate: "2025-08-01",
    estimatedCompletion: "2025-10-28",
    pdfUrl:
      "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/stockx.pdf",
  },
];

export async function getProjectsByEmail(email: string): Promise<Project[]> {
  console.log(`🚀 [Mock] Fetching projects for email: ${email}`);
  await new Promise((r) => setTimeout(r, 400));

  const projects = MOCK_PROJECTS.filter((proj) => proj.clientEmail === email);
  console.log(`✅ [Mock] Found ${projects.length} project(s) for ${email}`);

  return projects;
}
