"use client";
import { ExternalLink } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import HeroSection from "@/components/blocks/HeroSection";
import { Button } from "@/components/ui/button";
import contentData from "@/lib/data/content.json";
import projectsData from "@/lib/data/projects.json";
import type { PortfolioProject } from "@/types";

const projects: PortfolioProject[] = projectsData;

export default function WorkPage() {
  const { work } = contentData;
  const [filter, setFilter] = useState<string>("all");

  // Extract unique categories from projects
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(projects.map((project) => project.category)),
    );
    return ["all", ...uniqueCategories];
  }, []);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (filter === "all") {
      return projects;
    }
    return projects.filter((project) => project.category === filter);
  }, [filter]);

  return (
    <div className="bg-white min-h-screen">
      <HeroSection
        variant="standard"
        badge={work.hero.badge}
        title={work.hero.title}
        description={work.hero.description}
        maxWidth="max-w-7xl"
        blobs={[
          {
            position: "top-1/4",
            horizontal: "right-1/4",
            color: "bg-thistle",
            animated: false,
          },
        ]}
      />

      {/* Filter Section */}
      <section className="py-12 bg-white border-b border-gray-100 sticky top-20 z-40 backdrop-blur-lg bg-white/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                type="button"
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? "bg-periwinkle-600 text-white shadow-lg shadow-periwinkle-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                aria-pressed={filter === category}
                aria-label={`Filter by ${category === "all" ? "all projects" : category}`}
              >
                {category === "all" ? "All Projects" : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </div>
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-gray-900 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-periwinkle-900 rounded-full blur-3xl opacity-10"></div>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Create Something
              <br />
              <span className="bg-gradient-to-r from-periwinkle-400 to-periwinkle-300 bg-clip-text text-transparent">
                Exceptional?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Let's discuss how we can bring your vision to life with our proven
              approach.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                className="bg-periwinkle-600 hover:bg-periwinkle-500 text-white px-8 py-6 text-lg rounded-xl shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Your Project
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
    >
      {project.url ? (
        <Link
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
          aria-label={`View ${project.title} project website (opens in new tab)`}
        >
          <ProjectCardContent project={project} />
        </Link>
      ) : (
        <ProjectCardContent project={project} />
      )}
    </motion.div>
  );
}

function ProjectCardContent({ project }: { project: PortfolioProject }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-500 group-hover:shadow-2xl group-hover:border-periwinkle-200 h-full flex flex-col">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        {project.screenshotUrl ? (
          <Image
            src={project.screenshotUrl}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-contain p-8"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        {project.url && (
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl">
              <ExternalLink className="w-5 h-5 text-periwinkle-600" />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-periwinkle-50 text-periwinkle-700 text-xs font-medium">
            {project.category}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-periwinkle-600 transition-colors duration-300">
          {project.title}
        </h3>
      </div>
    </div>
  );
}
