"use client";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import resumeData from "@/lib/data/resume.json";
import { badgeColors } from "@/lib/helpers/resume-colors";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";

const SkillsSection = () => {
  const { skills: skillsData } = resumeData;

  return (
    <section className="pt-20 pb-32 px-6 bg-linear-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label={skillsData.label} title={skillsData.title} />

        {/* Tech Stack */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h4 className="text-lg font-semibold text-gray-900 mb-6">
            {skillsData.techStack.title}
          </h4>
          <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
            {skillsData.techStack.items.map((tech, index) => {
              const colors = badgeColors[index % badgeColors.length];
              return (
                <Badge
                  key={tech}
                  variant="outline"
                  className={cn(
                    "px-4 py-2 text-sm transition-all duration-300 shadow text-gray-900",
                    colors.bg,
                    colors.border,
                    colors.hoverBg,
                    colors.hoverBorder,
                  )}
                >
                  {tech}
                </Badge>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
