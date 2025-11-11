"use client";
import { ExternalLink, ImageIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import HeroSection from "@/components/blocks/HeroSection";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
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
              Let's discuss how we can bring your vision to life with our proven
              approach.
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

function ProjectCard({
  project,
  index,
}: {
  project: PortfolioProject;
  index: number;
}) {
  const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState(false);

  return (
    <>
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
            <ProjectCardContent
              project={project}
              onScreenshotClick={(e) => {
                e?.preventDefault();
                e?.stopPropagation();
                setIsScreenshotModalOpen(true);
              }}
            />
          </Link>
        ) : (
          <ProjectCardContent
            project={project}
            onScreenshotClick={() => setIsScreenshotModalOpen(true)}
          />
        )}
      </motion.div>

      {project.screenshotUrl && (
        <Dialog
          open={isScreenshotModalOpen}
          onOpenChange={setIsScreenshotModalOpen}
        >
          <AnimatePresence>
            {isScreenshotModalOpen && (
              <DialogContent className="max-w-5xl max-h-[90vh] p-0 border-0 bg-transparent shadow-none data-[state=open]:animate-none data-[state=closed]:animate-none [&>button]:hidden">
                <VisuallyHidden>
                  <DialogTitle>{project.title} - Screenshot</DialogTitle>
                </VisuallyHidden>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{
                    duration: 0.35,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="bg-white rounded-2xl overflow-hidden shadow-2xl w-full h-[95vh]"
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.35,
                      delay: 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={project.screenshotUrl}
                      alt={`Screenshot of ${project.title}`}
                      fill
                      className="object-cover"
                      sizes="90vw"
                    />
                    <button
                      type="button"
                      onClick={() => setIsScreenshotModalOpen(false)}
                      className="absolute right-4 top-4 z-50 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 cursor-pointer"
                      aria-label="Close screenshot modal"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </motion.div>
                </motion.div>
              </DialogContent>
            )}
          </AnimatePresence>
        </Dialog>
      )}
    </>
  );
}

function ProjectCardContent({
  project,
  onScreenshotClick,
}: {
  project: PortfolioProject;
  onScreenshotClick?: (e?: React.MouseEvent) => void;
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-500 group-hover:shadow-2xl group-hover:border-periwinkle-200 h-full flex flex-col">
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          src={project.imageUrl}
          alt={project.title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-contain p-8"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
          {project.screenshotUrl && (
            <button
              onClick={onScreenshotClick}
              className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200 cursor-pointer"
              aria-label={`View screenshot of ${project.title}`}
              type="button"
            >
              <ImageIcon className="w-5 h-5 text-jordy-blue" />
            </button>
          )}
          {project.url && (
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl">
              <ExternalLink className="w-5 h-5 text-jordy-blue" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="py-4 px-3 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {project.categories.map((category) => (
            <span
              key={category}
              className="px-3 py-1 rounded-full bg-periwinkle-50 text-dark-purple text-xs font-medium"
            >
              {category}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-jordy-blue transition-colors duration-300">
          {project.title}
        </h3>
      </div>
    </div>
  );
}
