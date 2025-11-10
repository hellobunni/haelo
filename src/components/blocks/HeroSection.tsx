"use client";
import {
  ArrowRight,
  Award,
  Calendar,
  ChevronDown,
  Code,
  Code2,
  Heart,
  LineChart,
  MessageCircle,
  Palette,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

// Icon mapping - add more icons as needed
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  ChevronDown,
  ArrowRight,
  Calendar,
  MessageCircle,
  Target,
  Palette,
  Code,
  TrendingUp,
  Heart,
  Users,
  Code2,
  LineChart,
  Award,
  Zap,
};

export interface BlobConfig {
  position: "top-1/4" | "top-1/3" | "bottom-1/4" | "bottom-1/3";
  horizontal: "left-1/4" | "left-1/2" | "right-1/4" | "right-1/3";
  color: string;
  animated?: boolean;
  delay?: number;
}

export interface HeroButton {
  text: string;
  href: string;
  icon?: string;
  variant?: "primary" | "secondary";
}

export interface HeroSectionProps {
  variant?: "fullscreen" | "standard" | "simple";
  badge?: {
    text: string;
    icon?: string;
  };
  title: {
    line1: string;
    line2?: string;
  };
  description: string;
  buttons?: {
    primary?: HeroButton;
    secondary?: HeroButton;
  };
  scrollIndicator?: boolean;
  blobs?: BlobConfig[];
  scrollAnimation?: boolean;
  maxWidth?: "max-w-5xl" | "max-w-6xl" | "max-w-7xl";
  titleSize?:
    | "text-5xl md:text-6xl lg:text-7xl"
    | "text-6xl md:text-7xl lg:text-8xl";
  badgeVariant?: "default" | "periwinkle";
}

export default function HeroSection({
  variant = "standard",
  badge,
  title,
  description,
  buttons,
  scrollIndicator = false,
  blobs = [],
  scrollAnimation = false,
  maxWidth = "max-w-6xl",
  titleSize = "text-5xl md:text-6xl lg:text-7xl",
  badgeVariant = "default",
}: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll animation setup (only for fullscreen variant with scrollAnimation enabled)
  // Hooks must be called unconditionally, so we always call them but conditionally use the result
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacityTransform = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const scaleTransform = useTransform(scrollYProgress, [0, 0.6], [1, 0.9]);

  const opacity =
    scrollAnimation && variant === "fullscreen" ? opacityTransform : undefined;
  const scale =
    scrollAnimation && variant === "fullscreen" ? scaleTransform : undefined;

  // Default blobs if none provided
  const defaultBlobs: BlobConfig[] =
    blobs.length > 0
      ? blobs
      : [
          {
            position: "top-1/4",
            horizontal: "right-1/4",
            color: "bg-thistle",
            animated: false,
          },
        ];

  // Icon resolution
  const BadgeIcon = badge?.icon ? iconMap[badge.icon] || Sparkles : Sparkles;
  const PrimaryButtonIcon = buttons?.primary?.icon
    ? iconMap[buttons.primary.icon] || ArrowRight
    : ArrowRight;

  // Section classes
  const sectionClasses =
    variant === "fullscreen"
      ? "relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-white"
      : variant === "simple"
        ? "relative py-16 overflow-hidden bg-gradient-to-b from-gray-50 to-white"
        : "relative py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white";

  // Override maxWidth for simple variant if not explicitly set
  const effectiveMaxWidth =
    variant === "simple" && maxWidth === "max-w-6xl" ? "max-w-5xl" : maxWidth;

  // Motion div style
  const motionStyle =
    scrollAnimation && variant === "fullscreen" && opacity && scale
      ? { opacity, scale }
      : undefined;

  return (
    <section ref={containerRef} className={sectionClasses}>
      {/* Blob Backgrounds */}
      <div
        className={`absolute inset-0 overflow-hidden ${variant === "fullscreen" ? "" : "pointer-events-none"}`}
      >
        {defaultBlobs.map((blob, index) => {
          const delayClass =
            blob.delay === 2000
              ? "animation-delay-2000"
              : blob.delay === 4000
                ? "animation-delay-4000"
                : "";
          const animatedClass = blob.animated !== false ? "animate-blob" : "";

          return (
            <div
              key={`${blob.position}-${blob.horizontal}-${blob.color}-${index}`}
              className={`absolute ${blob.position} ${blob.horizontal} w-96 h-96 ${blob.color} rounded-full mix-blend-multiply filter blur-3xl opacity-20 ${animatedClass} ${delayClass}`}
            />
          );
        })}
      </div>

      {/* Content */}
      <motion.div
        style={motionStyle}
        className={`relative z-10 ${effectiveMaxWidth} mx-auto px-6 ${variant === "fullscreen" ? "text-center" : ""}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: variant === "fullscreen" ? 0.8 : 0.6,
            ease: "easeOut",
          }}
          className={variant === "fullscreen" ? "" : "text-center"}
        >
          {/* Badge */}
          {badge && (
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${
                badgeVariant === "periwinkle"
                  ? "bg-periwinkle-50 border border-periwinkle-200"
                  : "bg-pale-purple border border-thistle"
              }`}
            >
              <BadgeIcon
                className={`w-4 h-4 ${
                  badgeVariant === "periwinkle"
                    ? "text-periwinkle-600"
                    : "text-lavender-floral"
                }`}
              />
              <span
                className={`text-sm font-medium ${
                  badgeVariant === "periwinkle"
                    ? "text-periwinkle-900"
                    : "text-dark-purple-2"
                }`}
              >
                {badge.text}
              </span>
            </div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: variant === "fullscreen" ? 0.8 : 0.6,
              delay: variant === "fullscreen" ? 0.1 : 0,
              ease: "easeOut",
            }}
            className={`${titleSize} font-bold text-gray-900 mb-6 ${variant === "fullscreen" ? "tracking-tight" : ""}`}
          >
            {title.line1}
            {title.line2 && variant !== "simple" && (
              <>
                <br />
                <span className="bg-gradient-to-r from-lavender-floral to-wisteria bg-clip-text text-transparent">
                  {title.line2}
                </span>
              </>
            )}
            {title.line2 && variant === "simple" && (
              <>
                <br />
                {title.line2}
              </>
            )}
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: variant === "fullscreen" ? 0.8 : 0.6,
              delay: variant === "fullscreen" ? 0.2 : 0,
              ease: "easeOut",
            }}
            className={`text-xl ${variant === "fullscreen" ? "md:text-2xl" : ""} text-gray-600 ${variant === "fullscreen" ? "mb-12" : ""} max-w-3xl mx-auto leading-relaxed`}
          >
            {description}
          </motion.p>

          {/* Buttons */}
          {buttons && (buttons.primary || buttons.secondary) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: variant === "fullscreen" ? 0.8 : 0.6,
                delay: variant === "fullscreen" ? 0.3 : 0,
                ease: "easeOut",
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            >
              {buttons.primary && (
                <Link href={buttons.primary.href}>
                  <Button
                    size="lg"
                    className="bg-lavender-floral hover:bg-dark-purple text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-thistle transition-all duration-300 hover:shadow-xl hover:shadow-wisteria"
                  >
                    {buttons.primary.text}
                    <PrimaryButtonIcon className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
              {buttons.secondary && (
                <Link href={buttons.secondary.href}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg rounded-xl transition-all duration-300"
                  >
                    {buttons.secondary.text}
                  </Button>
                </Link>
              )}
            </motion.div>
          )}

          {/* Scroll Indicator */}
          {scrollIndicator && variant === "fullscreen" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1, ease: "easeOut" }}
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
            >
              <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
