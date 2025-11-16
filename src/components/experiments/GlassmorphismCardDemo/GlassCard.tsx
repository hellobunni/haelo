"use client";
import { motion } from "motion/react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps {
  blurIntensity: "sm" | "md" | "lg" | "xl";
  title: string;
  description: string;
  index: number;
  onClick?: () => void;
  "aria-label"?: string;
}

const GlassCard = ({
  blurIntensity,
  title,
  description,
  index,
  onClick,
  "aria-label": ariaLabel,
}: GlassCardProps) => {
  const [isFocused, setIsFocused] = useState(false);

  // Map blur intensity to Tailwind classes
  const blurClasses = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
    xl: "backdrop-blur-xl",
  };

  // Generate unique IDs for ARIA relationships
  const titleId = `glass-card-title-${index}`;
  const descriptionId = `glass-card-description-${index}`;

  // Handle keyboard interactions
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick();
    }
  };

  // Default aria-label combines title and description if not provided
  const defaultAriaLabel = ariaLabel || `${title}. ${description}`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        y: -5,
      }}
      whileFocus={{
        scale: 1.02,
        y: -5,
      }}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : -1}
      role={onClick ? "button" : "article"}
      aria-label={onClick ? defaultAriaLabel : undefined}
      aria-labelledby={!onClick ? titleId : undefined}
      aria-describedby={!onClick ? descriptionId : undefined}
      onClick={onClick}
      className={cn(
        "relative",
        "bg-white/10",
        blurClasses[blurIntensity],
        "border border-white/20",
        "rounded-2xl",
        "p-6",
        "shadow-2xl",
        "transition-all duration-300",
        "hover:bg-white/15",
        "hover:border-white/30",
        "hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-transparent",
        "focus-visible:ring-purple-400",
        "focus-visible:ring-opacity-75",
        "focus-visible:bg-white/15",
        "focus-visible:border-white/30",
        "focus-visible:shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
        onClick ? "cursor-pointer" : "cursor-default",
      )}
    >
      {/* Content */}
      <h3 id={titleId} className="text-xl font-bold text-white mb-2">
        {title}
      </h3>
      <p id={descriptionId} className="text-white/80 text-sm">
        {description}
      </p>

      {/* Subtle inner glow on hover and focus */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: isFocused ? 1 : 0,
        }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-white/5 rounded-2xl pointer-events-none"
        aria-hidden="true"
      />
    </motion.article>
  );
};

export default GlassCard;

