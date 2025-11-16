"use client";
import { cva } from "class-variance-authority";
import { ExternalLink, ImageIcon, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden/visually-hidden";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/types";

type ProjectCardVariant = "default" | "resume";

const projectCardVariants = cva(
  "bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all duration-500 group-hover:shadow-2xl h-full flex flex-col",
  {
    variants: {
      variant: {
        default: "group-hover:border-periwinkle-200",
        resume: "group-hover:border-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const iconVariants = cva("w-5 h-5", {
  variants: {
    variant: {
      default: "text-jordy-blue",
      resume: "text-tropical-indigo",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const categoryVariants = cva("px-3 py-1 rounded-full text-xs font-medium", {
  variants: {
    variant: {
      default: "bg-periwinkle-50 text-dark-purple",
      resume: "bg-tropical-indigo/30 text-tropical-indigo-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const titleVariants = cva(
  "text-xl font-bold text-gray-900 mb-3 transition-colors duration-300",
  {
    variants: {
      variant: {
        default: "group-hover:text-jordy-blue",
        resume: "group-hover:text-tropical-indigo-2",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function ProjectCard({
  project,
  index = 0,
  variant = "default",
}: {
  project: PortfolioProject;
  index?: number;
  variant?: ProjectCardVariant;
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
              variant={variant}
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
            variant={variant}
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
  variant = "default",
  onScreenshotClick,
}: {
  project: PortfolioProject;
  variant?: ProjectCardVariant;
  onScreenshotClick?: (e?: React.MouseEvent) => void;
}) {
  return (
    <div className={cn(projectCardVariants({ variant }))}>
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
              <ImageIcon className={cn(iconVariants({ variant }))} />
            </button>
          )}
          {project.url && (
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl">
              <ExternalLink className={cn(iconVariants({ variant }))} />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="py-4 px-3 flex-1 flex flex-col">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {project.categories.map((category, index) => (
            <span
              key={category}
              className={cn(
                categoryVariants({ variant }),
                index >= 2 && "hidden md:inline",
              )}
            >
              {category}
            </span>
          ))}
        </div>
        <h3 className={cn(titleVariants({ variant }))}>{project.title}</h3>
      </div>
    </div>
  );
}

export default ProjectCard;
