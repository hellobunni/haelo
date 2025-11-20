/**
 * Type definitions for Labs section data structures
 */

export interface ProjectFeature {
  title: string;
  description: string;
  icon: string; // Icon identifier (e.g., "Sparkles", "Code2", "Zap")
}

export interface LabsProjectDetail {
  title: string;
  subtitle: string;
  description: string;
  role: string;
  duration: string;
  year: string;
  tags: string[];
  gradient: string; // e.g., "from-purple-500 to-pink-500"
  heroImage: string;
  overview: string;
  features: ProjectFeature[];
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  githubBranch?: string; // Specific branch to link to
  status?: "In Progress" | "Coming Soon" | "Under Construction" | "WIP";
}

export interface LabsProject {
  id: string;
  title: string;
  description: string;
  image?: string;
  imageUrl?: string;
  gradient?: string; // e.g., "from-purple-500 to-pink-500"
  tags: string[];
  categories?: string[]; // Alias for tags
  url?: string;
  href?: string; // Alias for url
  featured?: boolean; // Whether to show in featured section
  status?: "In Progress" | "Coming Soon" | "Under Construction" | "WIP"; // Project status
  githubUrl?: string | null; // GitHub repository URL
  githubBranch?: string; // Specific branch to link to
}

export interface Experiment {
  id: string;
  title: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  gradient?: string; // e.g., "from-purple-500 to-pink-500"
  tag?: string; // Single tag (for backward compatibility)
  tags?: string[]; // Multiple tags
  url?: string;
  href?: string; // Alias for url
  featured?: boolean; // Whether to show in featured section
}

export interface ExperimentDetail {
  title: string;
  subtitle?: string;
  description: string;
  tag?: string;
  gradient?: string;
  heroImage?: string;
  overview?: string;
  tags: string[];
  techStack?: string[];
  codeSnippet?: string;
  features?: string[];
  liveUrl?: string;
  githubUrl?: string;
  codeUrl?: string;
}
