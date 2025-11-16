"use client";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge/badge";

const TechStack = () => {
  return (
    <>
      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <h4 className="text-lg font-semibold text-gray-900 mb-6">
          Technologies & Tools
        </h4>
        <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
          {[
            "React",
            "Next.js 14",
            "TypeScript",
            "JavaScript ES2023+",
            "Tailwind CSS",
            "HTML5",
            "CSS3",
            "Node.js",
            "Zustand",
            "Redux",
            "Jest",
            "Git",
            "Figma",
            "Storybook",
            "WebRTC",
            "Vercel",
            "Supabase",
            "GraphQL",
          ].map((tech) => (
            <Badge
              key={tech}
              variant="outline"
              className="px-4 py-2 text-sm border-gray-300 hover:border-light-red hover:bg-fairy-tale transition-all duration-300"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default TechStack;
