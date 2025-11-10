"use client";

import { format } from "date-fns";
import { Edit, Eye, FileText, Rocket, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Project } from "@/types";
import EditProjectDialog from "../dialogs/EditProjectDialog";
import PdfUploadDialog from "../dialogs/PdfUploadDialog";
import PdfViewer from "../dialogs/PdfViewer";

export default function ProjectsTab() {
  const [projects, setProjects] = useState<
    (Project & { clientName: string; pdfUrl?: string })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [pdfViewerOpen, setPdfViewerOpen] = useState(false);
  const [selectedProjectPdf, setSelectedProjectPdf] = useState<{
    url: string;
    title: string;
  } | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<
    (Project & { clientName: string; pdfUrl?: string }) | null
  >(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/admin/projects");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case "Discovery":
        return "bg-purple-500/20 text-purple-600";
      case "Design":
        return "bg-blue-500/20 text-blue-600";
      case "Development":
        return "bg-orange-500/20 text-orange-600";
      case "Testing":
        return "bg-yellow-500/20 text-yellow-600";
      case "Launch":
        return "bg-pink-500/20 text-pink-600";
      case "Completed":
        return "bg-green-500/20 text-green-600";
      default:
        return "bg-gray-500/20 text-gray-600";
    }
  };

  const handleViewPdf = (
    project: Project & { clientName: string; pdfUrl?: string },
  ) => {
    if (project.pdfUrl) {
      setSelectedProjectPdf({
        url: project.pdfUrl,
        title: `${project.projectName} - ${project.clientName}`,
      });
      setPdfViewerOpen(true);
    } else {
      toast.error("No PDF available for this project");
    }
  };

  const handleUploadPdf = (
    project: Project & { clientName: string; pdfUrl?: string },
  ) => {
    setSelectedProject(project);
    setUploadDialogOpen(true);
  };

  const handleEdit = (
    project: Project & { clientName: string; pdfUrl?: string },
  ) => {
    setSelectedProject(project);
    setEditDialogOpen(true);
  };

  const handlePdfUpload = (_file: File, url: string) => {
    if (selectedProject) {
      const updatedProjects = projects.map((proj) =>
        proj.id === selectedProject.id ? { ...proj, pdfUrl: url } : proj,
      );
      setProjects(updatedProjects);
      console.log(
        `📄 PDF uploaded for project ${selectedProject.projectName}:`,
        url,
      );
    }
  };

  const handleSaveProject = (
    updatedProject: Project & { clientName: string; pdfUrl?: string },
  ) => {
    const updatedProjects = projects.map((proj) =>
      proj.id === updatedProject.id ? updatedProject : proj,
    );
    setProjects(updatedProjects);
    console.log(`✅ Project ${updatedProject.projectName} updated`);
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5" />
              <Skeleton className="h-6 w-32" />
            </CardTitle>
            <Skeleton className="h-9 w-28" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 3 }, (_, i) => i).map((idx) => (
              <div
                key={`skeleton-project-${idx}`}
                className="border rounded-lg p-6 space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-2 w-full" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            All Projects ({projects.length})
          </CardTitle>
          <Button
            onClick={() => {
              setSelectedProject(null);
              setUploadDialogOpen(true);
            }}
            size="sm"
          >
            <Upload className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {projects.length > 0 ? (
          <div className="space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-lg font-bold">
                        {project.projectName}
                      </h3>
                      {project.pdfUrl && (
                        <Badge className="bg-green-500/20 text-green-600 ml-2">
                          <FileText className="h-3 w-3 mr-1" />
                          PDF
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {project.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Client: {project.clientName}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Badge className={getProjectStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Progress</span>
                    <span className="font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>

                <div className="flex justify-between items-end">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Started:</span>
                      <p className="font-medium">
                        {format(new Date(project.startDate), "MMM d, yyyy")}
                      </p>
                    </div>
                    {project.estimatedCompletion && (
                      <div>
                        <span className="text-gray-500">Est. Completion:</span>
                        <p className="font-medium">
                          {format(
                            new Date(project.estimatedCompletion),
                            "MMM d, yyyy",
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-1">
                    {project.pdfUrl && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewPdf(project)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>View PDF</TooltipContent>
                      </Tooltip>
                    )}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUploadPdf(project)}
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Upload PDF</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(project)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Edit Project</TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-lg">
            <Rocket className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No projects found
            </h3>
          </div>
        )}
      </CardContent>

      {/* PDF Viewer Dialog */}
      {selectedProjectPdf && (
        <PdfViewer
          isOpen={pdfViewerOpen}
          onClose={() => {
            setPdfViewerOpen(false);
            setSelectedProjectPdf(null);
          }}
          pdfUrl={selectedProjectPdf.url}
          title={selectedProjectPdf.title}
        />
      )}

      {/* PDF Upload Dialog */}
      <PdfUploadDialog
        isOpen={uploadDialogOpen}
        onClose={() => {
          setUploadDialogOpen(false);
          setSelectedProject(null);
        }}
        onUpload={handlePdfUpload}
        title={
          selectedProject
            ? `Upload PDF for ${selectedProject.projectName}`
            : "Upload New Project"
        }
        existingUrl={selectedProject?.pdfUrl}
      />

      {/* Edit Project Dialog */}
      <EditProjectDialog
        isOpen={editDialogOpen}
        onClose={() => {
          setEditDialogOpen(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
        onSave={handleSaveProject}
      />
    </Card>
  );
}
