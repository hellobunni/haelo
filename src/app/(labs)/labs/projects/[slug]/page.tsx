"use client";
import { cva, type VariantProps } from "class-variance-authority";
import {
  ArrowLeft,
  Code2,
  ExternalLink,
  Github,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getProjectDetail } from "@/lib/data/labs-data";
import { cn } from "@/lib/utils";
import type { LabsProjectDetail } from "@/types/labs";

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

// Icon mapping for feature icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Code2,
  Zap,
};

// Helper to get icon component from string
function getIconComponent(
  iconName: string,
): React.ComponentType<{ className?: string }> {
  return iconMap[iconName] || Sparkles;
}

interface ProjectFeature {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Transform LabsProjectDetail to include React icon components
function transformProjectDetail(detail: LabsProjectDetail | undefined): {
  title: string;
  subtitle: string;
  description: string;
  role: string;
  duration: string;
  year: string;
  tags: string[];
  gradient: string;
  heroImage: string;
  overview: string;
  features: ProjectFeature[];
  techStack: string[];
  liveUrl: string | null;
  githubUrl: string;
} | null {
  if (!detail) return null;

  return {
    ...detail,
    features: detail.features.map((feature) => ({
      ...feature,
      icon: getIconComponent(feature.icon),
    })),
  };
}

export default function ProjectDetailPage() {
  const params = useParams();
  const projectSlug = params?.slug as string;
  const projectDetail = getProjectDetail(projectSlug);
  const project = transformProjectDetail(projectDetail);

  // Fallback to default project if not found
  if (!project) {
    const defaultDetail = getProjectDetail("haelo-component-library");
    const defaultProject = transformProjectDetail(defaultDetail);
    if (!defaultProject) {
      return <div>Project not found</div>;
    }
    const fallbackProject = defaultProject;
    return <ProjectDetailContent project={fallbackProject} />;
  }

  return <ProjectDetailContent project={project} />;
}

function ProjectDetailContent({
  project,
}: {
  project: {
    title: string;
    subtitle: string;
    description: string;
    role: string;
    duration: string;
    year: string;
    tags: string[];
    gradient: string;
    heroImage: string;
    overview: string;
    features: ProjectFeature[];
    techStack: string[];
    liveUrl: string | null;
    githubUrl: string;
  };
}) {
  return (
    <div className="relative min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent" />
          <div
            className={cn(
              gradientVariants({
                gradient: project.gradient as VariantProps<
                  typeof gradientVariants
                >["gradient"],
              }),
              "opacity-30 mix-blend-multiply",
            )}
          />
        </motion.div>

        {/* Content */}
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-16">
          <Link href="/labs#projects">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ x: -5 }}
              className="inline-flex items-center gap-2 mb-8 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Projects</span>
            </motion.button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.05 }}
                  className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm text-white"
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300">
              {project.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Details */}
      <section className="relative py-20 px-6 bg-[#0a0a0f]">
        <div className="max-w-7xl mx-auto">
          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8 mb-20"
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-400 text-sm mb-2">My Role</p>
              <p className="text-white text-lg font-medium">{project.role}</p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-400 text-sm mb-2">Duration</p>
              <p className="text-white text-lg font-medium">
                {project.duration}
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-gray-400 text-sm mb-2">Year</p>
              <p className="text-white text-lg font-medium">{project.year}</p>
            </div>
          </motion.div>

          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-6">Overview</h2>
            <p className="text-xl text-gray-300 leading-relaxed">
              {project.overview}
            </p>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-12">
              Key Features
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {project.features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="p-8 rounded-2xl bg-linear-to-br from-white/5 to-white/0 border border-white/10 hover:border-white/20 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-purple-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center mb-6">
                      <IconComponent className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Tech Stack</h2>
            <div className="flex flex-wrap gap-4">
              {project.techStack.map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-linear-to-r from-purple-500 to-teal-500 text-white font-medium"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View Live Demo</span>
              </motion.a>
            )}
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>View on GitHub</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
