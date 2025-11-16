"use client";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip/tooltip";
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
          <TooltipProvider delayDuration={300}>
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {skillsData.techStack.items.map((tech, index) => {
                const colors = badgeColors[index % badgeColors.length];
                const techName = typeof tech === "string" ? tech : tech.name;
                const techDescription =
                  typeof tech === "string" ? "" : tech.description;

                return (
                  <Tooltip key={techName}>
                    <TooltipTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                          mass: 0.8,
                        }}
                      >
                        <Badge
                          variant="outline"
                          className={cn(
                            "px-4 py-2 text-sm transition-all duration-500 shadow text-gray-900 cursor-pointer",
                            colors.bg,
                            colors.border,
                            colors.hoverBg,
                            colors.hoverBorder,
                          )}
                        >
                          {techName}
                        </Badge>
                      </motion.div>
                    </TooltipTrigger>
                    {techDescription && (
                      <TooltipContent
                        side="top"
                        className="max-w-xs text-center transition-all duration-500 ease-out animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
                        sideOffset={8}
                      >
                        <p className="text-sm">{techDescription}</p>
                      </TooltipContent>
                    )}
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
