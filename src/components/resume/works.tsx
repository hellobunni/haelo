"use client";
import projectsData from "@/lib/data/projects.json";
import ProjectCard from "../blocks/ProjectCard";
import { SectionHeader } from "./SectionHeader";

const WorkSection = () => {
  const projects = projectsData.slice(0, 6); // Show first 6 projects

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <SectionHeader label="Portfolio" title="Selected Work" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              variant="resume"
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkSection;
