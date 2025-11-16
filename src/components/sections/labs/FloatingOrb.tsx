"use client";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FloatingOrbProps {
  color: "purple" | "blue" | "teal";
  size: string;
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  delay?: number;
}

const colorMap = {
  purple: "bg-purple-500",
  blue: "bg-blue-500",
  teal: "bg-teal-500",
};

export default function FloatingOrb({
  color,
  size,
  top,
  right,
  bottom,
  left,
  delay = 0,
}: FloatingOrbProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: delay * 0.2 }}
      className={cn(
        "absolute rounded-full blur-3xl opacity-20",
        colorMap[color],
        top && top,
        right && right,
        bottom && bottom,
        left && left,
      )}
      style={{
        width: size,
        height: size,
      }}
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{
          duration: 4 + delay,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-full h-full rounded-full"
      />
    </motion.div>
  );
}
