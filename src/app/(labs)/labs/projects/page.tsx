"use client";
import { Code2 } from "lucide-react";
import { motion } from "motion/react";
import ProjectCard from "@/components/sections/labs/ProjectCard/ProjectCard";
import Container from "@/components/ui/container/container";
import { getAllProjects } from "@/lib/data/labs-data";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="relative min-h-screen py-20 px-6">
      <Container size="xl" paddingX="md" paddingY="none">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="w-10 h-10 text-resume-purple-2" />
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              All Projects
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl">
            High-fidelity prototypes and production-ready interfaces showcasing
            advanced UI engineering, motion design, and interaction patterns.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={{
                ...project,
                image: project.image || project.imageUrl || "",
              }}
              index={index}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
