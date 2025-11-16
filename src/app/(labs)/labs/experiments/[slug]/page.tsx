"use client";
import { cva, type VariantProps } from "class-variance-authority";
import {
  ArrowLeft,
  Check,
  Code2,
  Copy,
  ExternalLink,
  Github,
  Play,
} from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs/tabs";
import { getExperimentById, getExperimentDetail } from "@/lib/data/labs-data";
import { cn } from "@/lib/utils";
import type { Experiment, ExperimentDetail } from "@/types/labs";

const gradientVariants = cva("bg-linear-to-r", {
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
function getGradientClasses(
  gradient?: string,
  baseClass = "bg-linear-to-r",
): string {
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
  return `${baseClass} ${gradient}`;
}

// TODO: Import experiment demo components when created
// import CommandPaletteDemo from "@/components/experiments/CommandPaletteDemo";
// import GlassmorphismDemo from "@/components/experiments/GlassmorphismDemo";
// etc.

// Placeholder demo component until real ones are created
function PlaceholderDemo({ title }: { title: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 rounded-full bg-linear-to-br from-purple-500/20 to-teal-500/20 border border-white/10 flex items-center justify-center mx-auto mb-4">
          <Play className="w-12 h-12 text-purple-400" />
        </div>
        <p className="text-gray-400 text-lg">{title} Demo</p>
        <p className="text-gray-500 text-sm mt-2">
          Interactive demo coming soon
        </p>
      </div>
    </div>
  );
}

export default function ExperimentDetailPage() {
  const params = useParams();
  const experimentSlug = params?.slug as string;
  const experiment = getExperimentById(experimentSlug);
  const experimentDetail = getExperimentDetail(experimentSlug);

  // Fallback to default if not found
  if (!experiment) {
    const defaultExperiment = getExperimentById("magnetic-button");
    const defaultDetail = getExperimentDetail("magnetic-button");
    if (!defaultExperiment) {
      return (
        <div className="p-20 text-center text-white">Experiment not found</div>
      );
    }
    return (
      <ExperimentDetailContent
        experiment={defaultExperiment}
        detail={defaultDetail}
      />
    );
  }

  return (
    <ExperimentDetailContent
      experiment={experiment}
      detail={experimentDetail}
    />
  );
}

function ExperimentDetailContent({
  experiment,
  detail,
}: {
  experiment: Experiment;
  detail: ExperimentDetail | null | undefined;
}) {
  const [copied, setCopied] = useState(false);

  // Use detail data if available, otherwise fallback to experiment data
  const title = detail?.title || experiment.title;
  const subtitle = detail?.subtitle;
  const description = detail?.description || experiment.description;
  const displayTag =
    detail?.tag || experiment.tag || experiment.tags?.[0] || "Experiment";
  const gradient =
    detail?.gradient || experiment.gradient || "from-purple-500 to-pink-500";
  const tags = detail?.tags || experiment.tags || [];
  const techStack = detail?.techStack || [];
  const codeSnippet =
    detail?.codeSnippet ||
    `// Code example for ${title}
// Implementation details coming soon

const Example = () => {
  return (
    <div>
      {/* Your code here */}
    </div>
  );
};`;
  const features = detail?.features || [
    "Smooth animations",
    "Performance optimized",
    "Accessible",
    "Responsive design",
    "Modern React patterns",
  ];
  const liveUrl = detail?.liveUrl;
  const githubUrl = detail?.githubUrl;

  const copyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <Link href="/labs/experiments">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -5 }}
            className="inline-flex items-center gap-2 mb-8 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Experiments</span>
          </motion.button>
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span
              className={cn(
                "px-4 py-1.5 rounded-full text-white text-sm font-medium",
                getGradientClasses(gradient, "bg-linear-to-r"),
              )}
            >
              {displayTag}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            {title}
          </h1>
          {subtitle && (
            <h2 className="text-2xl md:text-3xl text-gray-300 mb-4">
              {subtitle}
            </h2>
          )}
          <p className="text-xl text-gray-400 max-w-3xl">{description}</p>
          {(tags.length > 0 || techStack.length > 0) && (
            <div className="flex flex-wrap gap-3 mt-6">
              {(techStack.length > 0 ? techStack : tags).map((tech: string) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        {/* Live Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Play className="w-6 h-6 text-purple-400" />
            <h2 className="text-2xl font-bold text-white">Live Demo</h2>
          </div>
          <div className="p-8 md:p-12 rounded-2xl bg-linear-to-br from-white/5 to-white/0 border border-white/10 min-h-[400px] flex items-center justify-center">
            <PlaceholderDemo title={title} />
          </div>
        </motion.div>

        {/* Code & Features */}
        <Tabs defaultValue="code" className="mb-12">
          <TabsList className="bg-white/5 border border-white/10">
            <TabsTrigger
              value="code"
              className="data-[state=active]:bg-white/10 text-white"
            >
              <Code2 className="w-4 h-4 mr-2" />
              Code Example
            </TabsTrigger>
            <TabsTrigger
              value="features"
              className="data-[state=active]:bg-white/10 text-white"
            >
              Features
            </TabsTrigger>
          </TabsList>

          <TabsContent value="code">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative p-6 rounded-2xl bg-[#0d0d12] border border-white/10 overflow-hidden"
            >
              <Button
                onClick={copyCode}
                size="sm"
                variant="ghost"
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{codeSnippet}</code>
              </pre>
            </motion.div>
          </TabsContent>

          <TabsContent value="features">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid md:grid-cols-2 gap-4"
            >
              {features.map((feature: string, index: number) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-linear-to-r from-purple-500 to-teal-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-gray-300">{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* CTAs */}
        {(liveUrl || githubUrl) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 mb-12"
          >
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-linear-to-r from-purple-500 to-teal-500 text-white font-medium"
              >
                <ExternalLink className="w-5 h-5" />
                <span>View Live Preview</span>
              </motion.a>
            )}
            {githubUrl && (
              <motion.a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
              </motion.a>
            )}
          </motion.div>
        )}

        {/* Implementation Notes */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-2xl bg-linear-to-br from-blue-500/10 to-purple-500/10 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-4">
            Implementation Notes
          </h3>
          <p className="text-gray-300 leading-relaxed">
            This experiment demonstrates advanced UI patterns with a focus on
            performance and user experience. The implementation uses modern
            React patterns, optimized animations, and follows accessibility best
            practices.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
