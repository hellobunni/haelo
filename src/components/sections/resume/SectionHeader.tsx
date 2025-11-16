"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  className?: string;
}

export const SectionHeader = ({
  label,
  title,
  className,
}: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className={cn("text-center mb-16", className)}
    >
      <h2 className="text-sm uppercase tracking-widest text-resume-purple-1 font-semibold mb-4">
        {label}
      </h2>
      <h3 className="text-4xl md:text-5xl font-bold text-gray-900">{title}</h3>
    </motion.div>
  );
};
