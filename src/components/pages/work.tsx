"use client";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import projectsData from "@/lib/data/projects.json";
import type { PortfolioProject } from "@/types";

const projects: PortfolioProject[] = projectsData;
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};


export default function WorkPage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-12 py-16"
    >
      <motion.h1
        variants={itemVariants}
        className="section-heading text-center mt-16 mb-4"
      >
        Selected Works
      </motion.h1>
      <motion.p
        variants={itemVariants}
        className="text-lg text-gray-600 text-center mb-16 max-w-3xl mx-auto"
      >
        Each project reflects our signature blend of elegance + engineering —
        crafted for clients who demand more than ordinary.
      </motion.p>
      <section 
  aria-label="Portfolio projects"
  className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-16"
>
  {projects.map((project) => (
    <ProjectCard key={project.title} project={project} />
  ))}
</section>
    </motion.div>
  );
}

function ProjectCard({ project }: { project: PortfolioProject }) {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const hasScreenshot = !!project.screenshotUrl;

  const previewTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.2 };

  return (
    <motion.div
      variants={itemVariants}
      className="h-full w-full relative focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-periwinkle focus-visible:rounded-sm"
      tabIndex={hasScreenshot ? 0 : -1}
      role={hasScreenshot ? "button" : undefined}
      aria-label={
        hasScreenshot
          ? `${project.title} project card. Press to view screenshot preview.`
          : project.title
      }
      onMouseEnter={() => hasScreenshot && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => hasScreenshot && setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
    >
      <div className="bg-primary/10 rounded-sm relative h-48 w-full mb-4 px-12">
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={556}
          height={556}
          sizes="(min-width: 428px) 33vw, 100vw"
          className="object-contain w-full h-full"
        />

      {/* Hover Preview Box - Centered over logo */}
      <AnimatePresence>
        {isHovered && hasScreenshot && (
          <>
            {/* Screen reader announcement */}
            <div role="status" aria-live="polite" className="sr-only">
              Showing screenshot preview for {project.title}
            </div>
            {/* Optional: Dim the logo behind the preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={previewTransition}
              className="absolute inset-0 bg-black/20 z-40 rounded-sm"
            />
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={previewTransition}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
              role="img"
              aria-label={`Screenshot preview of ${project.title}`}
            >
              <div className="relative w-72 h-48 rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={project.screenshotUrl!}
                  alt={`${project.title} screenshot`}
                  fill
                  sizes="256px"
                  className="object-cover"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>

      {/* Clickable Title */}
      {project.url ? (
        <Link
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
          aria-label={`View ${project.title} project website (opens in new tab)`}
        >
          <h3 className="text-xl font-bold group-hover:text-periwinkle transition-colors">
            {project.title}
          </h3>
        </Link>
      ) : (
        <h3 className="text-xl font-bold">{project.title}</h3>
      )}
      <p className="text-gray-500">{project.category}</p>
    </motion.div>
  );
}