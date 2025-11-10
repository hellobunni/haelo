export type ProjectStatus =
  | "Discovery"
  | "Design"
  | "Development"
  | "Testing"
  | "Launch"
  | "Completed";

export interface Project {
  id: string;
  projectName: string;
  description: string;
  clientEmail: string;
  status: ProjectStatus;
  progress: number;
  startDate: string;
  estimatedCompletion?: string;
  pdfUrl?: string;
}

// Extended type with client info for admin views
export interface ProjectWithClient extends Project {
  clientName: string;
}

// Type for portfolio/selected works projects
export interface PortfolioProject {
  title: string;
  category: string;
  imageUrl: string;
  screenshotUrl?: string;
  url?: string;
}