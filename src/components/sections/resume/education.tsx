"use client";
import { GraduationCap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import resumeData from "@/lib/data/resume.json";
import { fadeInUp, stagger } from "@/lib/helpers/motion-variants";
import { timelineColors } from "@/lib/helpers/resume-colors";
import { cn } from "@/lib/utils";
import { SectionHeader } from "./SectionHeader";

// Helper function to format date for display (YYYY-MM-DD -> YYYY-MM)
const formatDateForDisplay = (date: string | null): string => {
  if (!date) return "";
  return date.slice(0, 7); // Returns YYYY-MM
};

// Helper function to format period string for display (for education, show year range)
const formatPeriod = (
  startDate: string | null,
  endDate: string | null,
): string => {
  if (!startDate || !endDate) return "";

  const startYear = startDate.split("-")[0];
  const endYear = endDate.split("-")[0];

  if (startYear === endYear) {
    return startYear;
  }

  return `${startYear} - ${endYear}`;
};

const Education = () => {
  const { education } = resumeData;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-32 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <SectionHeader label={education.label} title={education.title} />

        {/* Timeline Container */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
          className="relative lg:block"
        >
          {/* Vertical Timeline Line */}
          <div className="absolute left-[140px] md:left-[160px] top-0 bottom-0 w-0.5 bg-slate-200 hidden lg:block z-0" />

          {/* Timeline Items */}
          <div className="space-y-8 md:space-y-12 lg:space-y-12">
            {education.items.map((item, index) => {
              const colors = timelineColors[index % timelineColors.length];
              const displayDate = formatDateForDisplay(item.startDate);
              const periodDisplay = formatPeriod(item.startDate, item.endDate);
              const isHovered = hoveredIndex === index;
              const isLast = index === education.items.length - 1;

              return (
                <motion.div
                  key={`${item.school}-${item.degree}-${index}`}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative flex flex-col md:flex-row items-center lg:items-start gap-4 md:gap-2 lg:gap-2 group max-w-2xl mx-auto lg:max-w-none lg:mx-0"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Date Column */}
                  <div className="w-full md:w-24 lg:w-32 shrink-0 pt-0 md:pt-1.5 text-center md:text-left lg:text-left order-2 md:order-1">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                      className="text-sm md:text-base text-slate-400 font-mono leading-0"
                    >
                      {displayDate}
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
                      <GraduationCap
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
                  <div className="flex-1 min-w-0 pb-8 md:pb-0 lg:pb-0 cursor-pointer text-center md:text-left lg:text-left order-3 w-full md:w-auto">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {/* Title */}
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

export default Education;
