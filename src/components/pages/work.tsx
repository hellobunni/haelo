"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import HeroSection from "@/components/sections/shared/HeroSection";
import ProjectCard from "@/components/sections/shared/ProjectCard";
import { Button } from "@/components/ui/button/button";
import contentData from "@/lib/data/content.json";
import projectsData from "@/lib/data/projects.json";
import type { PortfolioProject } from "@/types";

const projects: PortfolioProject[] = projectsData;

export default function WorkPage() {
  const { work } = contentData;
  const [filter, setFilter] = useState<string>("all");

  // Extract unique categories from projects (flatten all categories arrays)
  const categories = useMemo(() => {
    const allCategories = projects.flatMap((project) => project.categories);
    const uniqueCategories = Array.from(new Set(allCategories));
    return ["all", ...uniqueCategories];
  }, []);

  // Filter projects based on selected category
  const filteredProjects = useMemo(() => {
    if (filter === "all") {
      return projects;
    }
    return projects.filter((project) => project.categories.includes(filter));
  }, [filter]);

  return (
    <div className="bg-white min-h-screen">
      <HeroSection
        variant="standard"
        badge={work.hero.badge}
        title={{ line1: work.hero.title.line1, line2: work.hero.title.line2 }}
        description={work.hero.description}
        maxWidth="max-w-7xl"
        badgeVariant="blank"
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
      <section className="pt-12  border-gray-100 sticky top-20 z-40 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                type="button"
                key={category}
                variant={filter === category ? "periwinkle" : "outline"}
                onClick={() => setFilter(category)}
                className={`rounded-full `}
                aria-pressed={filter === category}
                aria-label={`Filter by ${category === "all" ? "all projects" : category}`}
              >
                {category === "all" ? "All Projects" : category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No projects found in this category.
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-linear-to-br from-gray-900 to-black text-white relative overflow-hidden">
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
              <span className="bg-linear-to-r from-periwinkle-400 to-periwinkle-300 bg-clip-text text-transparent">
                Exceptional?
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-10">
              Discuss how a proven approach can bring your vision to life.
            </p>
            <Link href="/contact">
              <Button
                size="lg"
                variant="periwinkle"
                className="shadow-none px-12 py-6 text-lg rounded-xl "
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
