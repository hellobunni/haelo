"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface Experiment {
  id: string;
  title: string;
  description?: string;
  image?: string;
  imageUrl?: string;
  gradient?: string; // e.g., "from-purple-500 to-pink-500"
  tag?: string; // Single tag (for backward compatibility)
  tags?: string[]; // Multiple tags
  url?: string;
  href?: string; // Alias for url
}

interface ExperimentCardProps {
  experiment: Experiment;
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

  // Check if gradient exists in variants
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

export default function ExperimentCard({
  experiment,
  index = 0,
}: ExperimentCardProps) {
  const imageSrc = experiment.imageUrl || experiment.image;
  const experimentUrl = experiment.href || experiment.url;
  // Support both single tag and tags array
  const displayTag = experiment.tag || experiment.tags?.[0];

  const cardContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="group relative h-64 rounded-xl overflow-hidden cursor-pointer"
    >
      {/* Background Image (if provided) */}
      {imageSrc && (
        <div className="absolute inset-0">
          <Image
            src={imageSrc}
            alt={experiment.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
        </div>
      )}

      {/* Background Gradient */}
      {experiment.gradient && (
        <div
          className={cn(
            getGradientClasses(experiment.gradient),
            "opacity-20 group-hover:opacity-30 transition-opacity",
          )}
        />
      )}

      {/* Glass Effect */}
      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-colors rounded-xl" />

      {/* Animated Glow */}
      {experiment.gradient && (
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={cn(
            getGradientClasses(experiment.gradient),
            "blur-2xl opacity-0 group-hover:opacity-30",
          )}
        />
      )}

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6">
        <div className="flex items-start justify-between">
          <motion.div
            whileHover={{ rotate: 180 }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="w-6 h-6 text-white/60" />
          </motion.div>
          {displayTag && (
            <span className="px-3 py-1 text-xs rounded-full bg-white/10 border border-white/20 text-white/80">
              {displayTag}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-teal-400 group-hover:bg-clip-text transition-all duration-300">
            {experiment.title}
          </h3>
          <div className="w-12 h-1 bg-linear-to-r from-purple-400 to-teal-400 rounded-full" />
          {experiment.description && (
            <p className="text-gray-300 text-sm mt-2 line-clamp-2">
              {experiment.description}
            </p>
          )}
        </div>
      </div>

      {/* Hover Effect */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent pointer-events-none"
      />

      {/* View Link (appears on hover) */}
      {experimentUrl && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-6 right-6 flex items-center gap-2 text-white text-sm font-medium"
        >
          <span>View</span>
          <ArrowUpRight className="w-4 h-4" />
        </motion.div>
      )}
    </motion.div>
  );

  if (experimentUrl) {
    return (
      <Link
        href={experimentUrl}
        className="block"
        aria-label={`View ${experiment.title} experiment`}
      >
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
