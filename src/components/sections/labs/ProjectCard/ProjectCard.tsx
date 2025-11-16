"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight, Play } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface LabsProject {
  id: string;
  title: string;
  description: string;
  image: string;
  imageUrl?: string; // Fallback to image
  gradient?: string; // e.g., "from-purple-500 to-pink-500"
  tags: string[];
  categories?: string[]; // Alias for tags
  url?: string;
  href?: string; // Alias for url
}

interface ProjectCardProps {
  project: LabsProject;
  index?: number;
}

const gradientVariants = cva("absolute inset-0 bg-linear-to-br", {
  variants: {
    gradient: {
      "from-purple-500 to-pink-500": "from-purple-500 to-pink-500",
      "from-blue-500 to-teal-500": "from-blue-500 to-teal-500",
      "from-orange-500 to-red-500": "from-orange-500 to-red-500",
      "from-green-500 to-emerald-500": "from-green-500 to-emerald-500",
      "from-indigo-500 to-purple-500": "from-indigo-500 to-purple-500",
      "from-cyan-500 to-blue-500": "from-cyan-500 to-blue-500",
      "from-rose-500 to-pink-500": "from-rose-500 to-pink-500",
      "from-violet-500 to-purple-500": "from-violet-500 to-purple-500",
      "from-amber-500 to-orange-500": "from-amber-500 to-orange-500",
      "from-teal-500 to-cyan-500": "from-teal-500 to-cyan-500",
      "from-slate-500 to-gray-500": "from-slate-500 to-gray-500",
      "from-yellow-500 to-amber-500": "from-yellow-500 to-amber-500",
    },
  },
});

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Use imageUrl if available, otherwise fall back to image
  const imageSrc = project.imageUrl || project.image;

  // Use href if available, otherwise fall back to url
  const projectUrl = project.href || project.url;

  // Use categories if available, otherwise fall back to tags
  const projectTags = project.categories || project.tags;

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-[500px] rounded-2xl overflow-hidden cursor-pointer"
    >
      {/* Background Image */}
      <motion.div
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0"
      >
        <Image
          src={imageSrc}
          alt={project.title}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/50 to-transparent" />
      </motion.div>

      {/* Gradient Overlay */}
      {project.gradient && (
        <motion.div
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          className={cn(
            gradientVariants({
              gradient: project.gradient as VariantProps<
                typeof gradientVariants
              >["gradient"],
            }),
          )}
        />
      )}

      {/* Glass Border */}
      <div className="absolute inset-0 border border-white/10 rounded-2xl group-hover:border-white/20 transition-colors" />

      {/* Play Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: isHovered ? 1 : 0,
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center"
      >
        <Play className="w-8 h-8 text-white fill-white ml-1" />
      </motion.div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {projectTags.slice(0, 3).map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: isHovered ? 1 : 0.7, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="px-3 py-1 text-xs rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white"
            >
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-teal-400 group-hover:bg-clip-text transition-all duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <motion.p
          animate={{
            opacity: isHovered ? 1 : 0.7,
            y: isHovered ? 0 : 10,
          }}
          className="text-gray-300 text-sm leading-relaxed mb-4"
        >
          {project.description}
        </motion.p>

        {/* CTA */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -10,
          }}
          className="flex items-center gap-2 text-white font-medium"
        >
          <span>View Project</span>
          <ArrowUpRight className="w-4 h-4" />
        </motion.div>
      </div>

      {/* Shimmer Effect */}
      <motion.div
        animate={{
          x: isHovered ? ["-100%", "100%"] : "-100%",
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent"
        style={{ transform: "skewX(-20deg)" }}
      />
    </motion.div>
  );

  // If there's a URL, wrap in Link, otherwise just render the card
  if (projectUrl) {
    return (
      <Link
        href={projectUrl}
        className="block"
        aria-label={`View ${project.title} project`}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
