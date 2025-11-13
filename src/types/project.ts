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

// Type for resume/selected works projects
export interface PortfolioProject {
  title: string;
  categories: string[]; // Array of categories (max 3)
  imageUrl: string;
  screenshotUrl?: string;
  url?: string;
}
