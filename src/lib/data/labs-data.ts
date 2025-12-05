import type {
  Experiment,
  ExperimentDetail,
  LabsProject,
  LabsProjectDetail,
} from "@/types/labs";
import experimentsData from "./labs-experiments.json";
import projectsData from "./labs-projects.json";

/**
 * Get all projects
 */
export function getAllProjects(): LabsProject[] {
  return projectsData.projects.map((project) => ({
    ...project,
    status: project.status as LabsProject["status"],
  }));
}

/**
 * Get featured projects only
 */
export function getFeaturedProjects(): LabsProject[] {
  return projectsData.projects
    .filter((project) => project.featured)
    .map((project) => ({
      ...project,
      status: project.status as LabsProject["status"],
    }));
}

/**
 * Get project by ID/slug
 */
export function getProjectById(id: string): LabsProject | undefined {
  const project = projectsData.projects.find((project) => project.id === id);
  if (!project) return undefined;
  return {
    ...project,
    status: project.status as LabsProject["status"],
  };
}

/**
 * Get project detail by slug
 */
export function getProjectDetail(slug: string): LabsProjectDetail | undefined {
  const detail =
    projectsData.details[slug as keyof typeof projectsData.details];
  if (!detail) return undefined;

  // Type assertion to ensure status is properly typed
  return {
    ...detail,
    status: detail.status as LabsProjectDetail["status"],
  } as LabsProjectDetail;
}

/**
 * Get all experiments
 */
export function getAllExperiments(): Experiment[] {
  return experimentsData.experiments;
}

/**
 * Get featured experiments only
 */
export function getFeaturedExperiments(): Experiment[] {
  return experimentsData.experiments.filter(
    (experiment) => experiment.featured,
  );
}

/**
 * Get experiment by ID/slug
 */
export function getExperimentById(id: string): Experiment | undefined {
  return experimentsData.experiments.find((experiment) => experiment.id === id);
}

/**
 * Get experiment detail by slug
 */
export function getExperimentDetail(
  slug: string,
): ExperimentDetail | undefined {
  return experimentsData.details?.[
    slug as keyof typeof experimentsData.details
  ];
}

/**
 * Get projects by tag
 */
export function getProjectsByTag(tag: string): LabsProject[] {
  return projectsData.projects
    .filter((project) => project.tags.includes(tag))
    .map((project) => ({
      ...project,
      status: project.status as LabsProject["status"],
    }));
}

/**
 * Get experiments by tag
 */
export function getExperimentsByTag(tag: string): Experiment[] {
  return experimentsData.experiments.filter(
    (experiment) => experiment.tags?.includes(tag) || experiment.tag === tag,
  );
}
