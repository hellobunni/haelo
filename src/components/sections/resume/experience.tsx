"use client";
import {
  CheckCircle2,
  Circle,
  CircleDot,
  GraduationCap,
  type LucideIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge/badge";
import resumeData from "@/lib/data/resume.json";
import { fadeInUp, stagger } from "@/lib/helpers/motion-variants";
import { timelineColors } from "@/lib/helpers/resume-colors";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";

// Helper function to format period string for display (expects YYYY-MM format)
const formatPeriod = (
  startDate: string | null,
  endDate: string | null,
): string => {
  // Handle missing startDate
  if (!startDate || startDate.trim() === "") return "";

  // Normalize start date to YYYY-MM format (slice if YYYY-MM-DD)
  const normalizedStart =
    startDate.length >= 7 ? startDate.slice(0, 7) : startDate;
  const startParts = normalizedStart.split("-");

  if (startParts.length < 2) return "";

  const startYear = startParts[0];

  // Handle missing endDate - show "XXX" placeholder
  const hasEndDate = endDate && endDate.trim() !== "";
  const normalizedEnd = hasEndDate
    ? endDate.length >= 7
      ? endDate.slice(0, 7)
      : endDate
    : null;
  const endParts = normalizedEnd ? normalizedEnd.split("-") : null;

  // Show year-only format: "2022-2025" or "2022-XXX"
  if (!hasEndDate || !endParts || endParts.length < 2) {
    return `${startYear}-XXX`;
  }

  const endYear = endParts[0];

  // Always show the full range: "2022-2025" or "2022-2022" if same year
  return `${startYear}-${endYear}`;
};

// Icon array for variety (for experience items)
const icons: LucideIcon[] = [CheckCircle2, CircleDot, Circle];

// Type for timeline items
type TimelineItem =
  | {
      type: "experience";
      role: string;
      company: string;
      startDate: string | null;
      endDate: string | null;
      wip?: boolean;
      achievements: string[];
    }
  | {
      type: "education";
      degree: string;
      school: string;
      schoolDetail?: string;
      startDate: string | null;
      endDate: string | null;
      description: string;
    };

const Experience = () => {
  const { experience, education } = resumeData;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Combine experience and education items
  const timelineItems: TimelineItem[] = [
    ...experience.items.map((item) => ({
      type: "experience" as const,
      ...item,
    })),
    ...education.items.map((item) => ({
      type: "education" as const,
      ...item,
    })),
  ];

  // Sort by start date (most recent first)
  timelineItems.sort((a, b) => {
    const dateA = a.startDate || "0000-01";
    const dateB = b.startDate || "0000-01";
    return dateB.localeCompare(dateA);
  });

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label={experience.label} title={experience.title} />

        {/* Timeline Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="relative lg:block"
        >
          {/* Vertical Timeline Line */}
          <div className="absolute left-[190px] md:left-[190px] top-0 bottom-0 w-0.5 bg-slate-200 hidden lg:block z-0" />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-12 lg:space-y-12">
            {timelineItems.map((item, index) => {
              const isEducation = item.type === "education";
              const Icon = isEducation
                ? GraduationCap
                : icons[index % icons.length];
              const colors = timelineColors[index % timelineColors.length];
              const periodDisplay = formatPeriod(item.startDate, item.endDate);
              const isHovered = hoveredIndex === index;
              const isLast = index === timelineItems.length - 1;

              return (
                <motion.div
                  key={
                    isEducation
                      ? `${item.school}-${item.degree}-${index}`
                      : `${item.company}-${item.role}-${index}`
                  }
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex flex-col md:flex-row items-center lg:items-center gap-4 md:gap-2 lg:gap-2 group max-w-2xl mx-auto lg:max-w-none lg:mx-0"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Date Column */}
                  <div className="w-full md:w-40 lg:w-40 shrink-0 pt-0 md:pt-1.5 text-center md:text-center lg:text-center order-2 md:order-1">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                      className="text-sm md:text-base text-slate-400 font-mono leading-0"
                    >
                      {periodDisplay}
                    </motion.div>
                  </div>

                  {/* Icon Column */}
                  <div className="relative z-10 shrink-0 order-1 md:order-2">
                    <motion.div
                      whileHover={{ scale: 1.15 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 17,
                      }}
                      className={cn(
                        "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2 border-white",
                        colors.bg,
                        isHovered && "shadow-lg scale-110",
                        isHovered && colors.shadow,
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-5 h-5 md:w-6 md:h-6 text-white transition-transform duration-300",
                          isHovered && "scale-110",
                        )}
                      />
                    </motion.div>

                    {/* Mobile Timeline Line */}
                    {!isLast && (
                      <div className="-z-20 absolute top-30 left-1/2 -translate-x-1/2 w-0.5 h-18 bg-slate-200 md:hidden" />
                    )}
                  </div>

                  {/* Content Column */}
                  <div className="flex-1 min-w-0 pb-8 md:pb-0 lg:pb-0 cursor-pointer text-center md:text-left lg:text-left order-3 w-full md:w-auto md:ml-12">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {isEducation ? (
                        <>
                          {/* Education Title */}
                          <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-2 transition-colors duration-300 leading-none">
                            {item.school}
                          </h4>

                          {/* Degree */}
                          <p className="text-sm md:text-base text-gray-600 font-medium">
                            {item.degree}
                          </p>

                          {/* School Detail & Description - Show on hover */}
                          <motion.div
                            initial={false}
                            animate={{
                              opacity: isHovered ? 1 : 0,
                              height: isHovered ? "auto" : 0,
                              marginTop: isHovered ? 12 : 0,
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            {item.schoolDetail && (
                              <p className="text-sm md:text-base text-gray-500 italic mb-2">
                                {item.schoolDetail}
                              </p>
                            )}
                            <p className="text-sm md:text-base text-gray-600 italic mb-2">
                              {periodDisplay}
                            </p>
                            <p className="text-sm lg:text-base text-gray-700">
                              {item.description}
                            </p>
                          </motion.div>
                        </>
                      ) : (
                        <>
                          {/* Experience Title */}
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <h4 className="text-lg md:text-xl font-bold text-gray-900 transition-colors duration-300 leading-none">
                              {item.company}
                            </h4>
                            {item.wip && (
                              <Badge
                                variant="warning"
                                size="sm"
                                className="text-xs font-medium"
                              >
                                WIP
                              </Badge>
                            )}
                          </div>

                          {/* Role */}
                          <p className="text-sm md:text-base text-gray-600">
                            {item.role}
                          </p>

                          {/* Achievements - Show on hover */}
                          <motion.div
                            initial={false}
                            animate={{
                              opacity: isHovered ? 1 : 0,
                              height: isHovered ? "auto" : 0,
                              marginTop: isHovered ? 12 : 0,
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <p className="text-sm md:text-base text-gray-600 italic">
                              {periodDisplay}
                            </p>
                            <ul className="space-y-2">
                              {item.achievements.map((achievement, i) => (
                                <motion.li
                                  key={`${item.company}-achievement-${achievement.slice(0, 30)}-${i}`}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{
                                    opacity: isHovered ? 1 : 0,
                                    x: isHovered ? 0 : -10,
                                  }}
                                  transition={{
                                    duration: 0.2,
                                    delay: i * 0.05,
                                  }}
                                  className="flex items-start gap-2 text-sm lg:text-base text-gray-700"
                                >
                                  <span
                                    className={cn(
                                      colors.text,
                                      "mt-1.5 shrink-0",
                                    )}
                                  >
                                    •
                                  </span>
                                  <span>{achievement}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        </>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
