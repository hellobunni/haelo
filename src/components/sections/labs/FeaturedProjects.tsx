"use client";
import { Code2, Wrench } from "lucide-react";
import { motion } from "motion/react";
import Container from "@/components/ui/container/container";
import { getFeaturedProjects } from "@/lib/data/labs-data";
import ProjectCardComingSoon from "./ProjectCardComingSoon/ProjectCardComingSoon";

const FeaturedProjects = () => {
  const featuredProjects = getFeaturedProjects();

  // Map projects to include status - all set to Coming Soon for now
  const projectsWithStatus = featuredProjects.map((project) => ({
    ...project,
    image: project.image || project.imageUrl || "",
    status: "Coming Soon" as const,
  }));

  return (
    <section className="relative py-32 px-6">
      <Container size="xl" paddingX="md" paddingY="none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <Code2 className="w-8 h-8 text-purple-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Featured Projects
            </h2>
          </div>
          <p className="text-gray-400 text-lg mb-4">
            High-fidelity prototypes across fintech, Web3, and entertainment
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
            <Wrench className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm font-medium">
              Coming soon — under construction
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsWithStatus.map((project, index) => (
            <ProjectCardComingSoon
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProjects;
