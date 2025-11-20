"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { Clock, Github, Lock, Sparkles, Wrench } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export interface ProjectComingSoon {
  id: string;
  title: string;
  description: string;
  image: string;
  imageUrl?: string;
  gradient?: string;
  tags: string[];
  status: "In Progress" | "Coming Soon" | "Under Construction" | "WIP";
  githubUrl?: string | null;
  githubBranch?: string;
}

interface ProjectCardComingSoonProps {
  project: ProjectComingSoon;
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
      "from-blue-500 to-cyan-500": "from-blue-500 to-cyan-500",
      "from-gray-800 to-gray-900": "from-gray-800 to-gray-900",
      "from-emerald-500 to-teal-500": "from-emerald-500 to-teal-500",
    },
  },
});

// Helper function to get gradient classes, with fallback for gradients not in variants
function getGradientClasses(gradient?: string): string {
  if (!gradient) return "";

  const validGradients: string[] = [
    "from-purple-500 to-pink-500",
    "from-blue-500 to-teal-500",
    "from-orange-500 to-red-500",
    "from-green-500 to-emerald-500",
    "from-indigo-500 to-purple-500",
    "from-cyan-500 to-blue-500",
    "from-rose-500 to-pink-500",
    "from-violet-500 to-purple-500",
    "from-amber-500 to-orange-500",
    "from-teal-500 to-cyan-500",
    "from-slate-500 to-gray-500",
    "from-yellow-500 to-amber-500",
    "from-blue-500 to-cyan-500",
    "from-gray-800 to-gray-900",
    "from-emerald-500 to-teal-500",
  ];

  if (validGradients.includes(gradient)) {
    return gradientVariants({
      gradient: gradient as VariantProps<typeof gradientVariants>["gradient"],
    });
  }

  // Fallback: use the gradient string directly
  return `absolute inset-0 bg-linear-to-br ${gradient}`;
}

export default function ProjectCardComingSoon({
  project,
  index = 0,
}: ProjectCardComingSoonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const imageSrc = project.imageUrl || project.image;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-[500px] rounded-2xl overflow-hidden"
    >
      {/* Background Image with blur */}
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
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/70 to-black/50 backdrop-blur-[2px]" />
      </motion.div>

      {/* Gradient Overlay */}
      {project.gradient && (
        <motion.div
          animate={{ opacity: isHovered ? 0.2 : 0.1 }}
          className={cn(getGradientClasses(project.gradient))}
        />
      )}

      {/* Glass Border */}
      <div className="absolute inset-0 border border-white/10 rounded-2xl" />

      {/* Lock/Status Icon */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            scale: isHovered ? [1, 1.1, 1] : 1,
            rotate: isHovered ? [0, 10, -10, 0] : 0,
          }}
          transition={{ duration: 0.5 }}
          className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center relative"
        >
          {project.status === "In Progress" ? (
            <Clock className="w-10 h-10 text-white" />
          ) : project.status === "Under Construction" ? (
            <Wrench className="w-10 h-10 text-white" />
          ) : project.status === "WIP" ? (
            <Sparkles className="w-10 h-10 text-white" />
          ) : (
            <Lock className="w-10 h-10 text-white" />
          )}

          {/* Animated ring */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full border-2 border-white"
          />
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-8">
        {/* Status Badge */}
        <div className="flex justify-end">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "px-4 py-2 rounded-full backdrop-blur-md border flex items-center gap-2",
              project.status === "In Progress"
                ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-200"
                : project.status === "Under Construction"
                  ? "bg-orange-500/20 border-orange-500/30 text-orange-200"
                  : project.status === "WIP"
                    ? "bg-blue-500/20 border-blue-500/30 text-blue-200"
                    : "bg-purple-500/20 border-purple-500/30 text-purple-200",
            )}
          >
            {project.status === "In Progress" ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-medium">In Progress</span>
              </>
            ) : project.status === "Under Construction" ? (
              <>
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Wrench className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-medium">Under Construction</span>
              </>
            ) : project.status === "WIP" ? (
              <>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.div>
                <span className="text-sm font-medium">WIP</span>
              </>
            ) : (
              <>
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Coming Soon</span>
              </>
            )}
          </motion.div>
        </div>

        {/* Bottom Content */}
        <div>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag, i) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.6, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="px-3 py-1 text-xs rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white mb-3">
            {project.title}
          </h3>

          {/* Description */}
          <motion.p
            animate={{
              opacity: isHovered ? 0.8 : 0.6,
            }}
            className="text-gray-300 text-sm leading-relaxed mb-4"
          >
            {project.description}
          </motion.p>

          {/* GitHub Link - Show for In Progress or WIP projects */}
          {(project.status === "In Progress" || project.status === "WIP") &&
            project.githubUrl && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: isHovered ? 1 : 0.7,
                  y: isHovered ? 0 : 10,
                }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={
                    project.githubBranch
                      ? `${project.githubUrl}/tree/${project.githubBranch}`
                      : project.githubUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors group"
                >
                  <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">
                    {project.githubBranch
                      ? `View ${project.githubBranch} branch`
                      : "View on GitHub"}
                  </span>
                </Link>
              </motion.div>
            )}
        </div>
      </div>

      {/* Shimmer Effect on hover */}
      <motion.div
        animate={{
          x: isHovered ? ["-100%", "100%"] : "-100%",
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: "linear",
        }}
        className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
        style={{ transform: "skewX(-20deg)" }}
      />
    </motion.div>
  );
}
