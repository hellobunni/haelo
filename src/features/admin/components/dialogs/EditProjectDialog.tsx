"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import type { Project, ProjectStatus } from "@/types";

interface EditProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: (Project & { clientName: string; pdfUrl?: string }) | null;
  onSave: (
    updatedProject: Project & { clientName: string; pdfUrl?: string },
  ) => void;
}

export default function EditProjectDialog({
  isOpen,
  onClose,
  project,
  onSave,
}: EditProjectDialogProps) {
  const [formData, setFormData] = useState<{
    projectName: string;
    description: string;
    status: ProjectStatus;
    progress: number;
    startDate: string;
    estimatedCompletion: string;
    pdfUrl: string;
  }>({
    projectName: project?.projectName || "",
    description: project?.description || "",
    status: project?.status || "Discovery",
    progress: project?.progress || 0,
    startDate: project?.startDate || "",
    estimatedCompletion: project?.estimatedCompletion || "",
    pdfUrl: project?.pdfUrl || "",
  });

  React.useEffect(() => {
    if (project) {
      setFormData({
        projectName: project.projectName,
        description: project.description,
        status: project.status,
        progress: project.progress,
        startDate: project.startDate,
        estimatedCompletion: project.estimatedCompletion || "",
        pdfUrl: project.pdfUrl || "",
      });
    }
  }, [project]);

  const handleSubmit = () => {
    if (project) {
      onSave({
        ...project,
        ...formData,
      });
    }
    onClose();
  };

  const statuses = [
    "Discovery",
    "Design",
    "Development",
    "Testing",
    "Launch",
    "Completed",
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              value={formData.projectName}
              onChange={(e) =>
                setFormData({ ...formData, projectName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Status</Label>
            <RadioGroup
              value={formData.status}
              onValueChange={(value) =>
                setFormData({
                  ...formData,
                  status: value as Project["status"],
                })
              }
              className="flex flex-row flex-wrap gap-4"
            >
              {statuses.map((status) => (
                <div key={status} className="flex items-center space-x-2">
                  <RadioGroupItem value={status} id={`status-${status}`} />
                  <Label
                    htmlFor={`status-${status}`}
                    className="cursor-pointer font-normal"
                  >
                    {status}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="progress">Progress (%)</Label>
            <Input
              id="progress"
              type="number"
              min="0"
              max="100"
              value={formData.progress}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  progress: parseInt(e.target.value, 10) || 0,
                })
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedCompletion">Est. Completion</Label>
              <Input
                id="estimatedCompletion"
                type="date"
                value={formData.estimatedCompletion}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimatedCompletion: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pdfUrl">Project PDF URL</Label>
            <Input
              id="pdfUrl"
              type="url"
              placeholder="https://example.com/project.pdf"
              value={formData.pdfUrl}
              onChange={(e) =>
                setFormData({ ...formData, pdfUrl: e.target.value })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
