"use client";
import { cva } from "class-variance-authority";
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
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge/badge";
import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";

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
  Shield,
};

// CVA Variants
const sectionVariants = cva("relative overflow-hidden", {
  variants: {
    variant: {
      fullscreen:
        "min-h-screen flex items-center justify-center bg-linear-to-b from-gray-50 to-white",
      lab: "min-h-screen flex items-center justify-center bg-linear-to-b from-gray-900 via-gray-800 to-gray-900",
      simple: "py-16 bg-linear-to-b from-gray-50 to-white",
      standard: "py-32 bg-linear-to-b from-gray-50 to-white",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
});

const blobContainerVariants = cva("absolute inset-0 overflow-hidden", {
  variants: {
    variant: {
      fullscreen: "",
      lab: "pointer-events-none",
      simple: "pointer-events-none",
      standard: "pointer-events-none",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
});

const titleVariants = cva("font-bold mb-6", {
  variants: {
    variant: {
      fullscreen: "text-gray-900 tracking-tight",
      lab: "text-white tracking-tight",
      simple: "text-gray-900",
      standard: "text-gray-900",
    },
    size: {
      default: "text-5xl md:text-6xl lg:text-7xl",
      large: "text-6xl md:text-7xl lg:text-8xl",
    },
  },
  defaultVariants: {
    variant: "standard",
    size: "default",
  },
});

const titleGradientVariants = cva(
  "bg-linear-to-r bg-clip-text text-transparent",
  {
    variants: {
      variant: {
        fullscreen: "from-jordy-blue to-wisteria",
        lab: "from-purple-400 via-blue-400 to-teal-400",
        simple: "",
        standard: "from-jordy-blue to-wisteria",
      },
      badgeVariant: {
        default: "from-jordy-blue to-wisteria",
        periwinkle: "from-jordy-blue to-periwinkle-400",
        blank: "from-jordy-blue to-wisteria",
        dark: "from-jordy-blue to-wisteria",
        lab: "from-purple-400 via-blue-400 to-teal-400",
      },
    },
    defaultVariants: {
      variant: "standard",
      badgeVariant: "default",
    },
  },
);

const descriptionVariants = cva("text-lg max-w-4xl mx-auto leading-relaxed", {
  variants: {
    variant: {
      fullscreen: "md:text-xl text-gray-600 mb-12",
      lab: "md:text-xl text-gray-400 mb-12",
      simple: "text-gray-600",
      standard: "text-gray-600",
    },
  },
  defaultVariants: {
    variant: "standard",
  },
});

const blobDelayVariants = cva("", {
  variants: {
    delay: {
      0: "",
      2000: "animation-delay-2000",
      4000: "animation-delay-4000",
    },
  },
  defaultVariants: {
    delay: 0,
  },
});

type BadgeVariantType = "default" | "periwinkle" | "blank" | "dark" | "lab";

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
  variant?: "primary" | "secondary" | "lab" | "gradient" | "glass";
}

export interface HeroSectionProps {
  variant?: "fullscreen" | "standard" | "simple" | "lab";
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
  badgeVariant?: "default" | "periwinkle" | "blank" | "dark" | "lab";
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
  const getBadgeIcon = () => {
    if (!badge?.icon) return null;
    // Try exact match first
    if (iconMap[badge.icon]) return iconMap[badge.icon];
    // Try capitalized version
    const capitalized =
      badge.icon.charAt(0).toUpperCase() + badge.icon.slice(1);
    if (iconMap[capitalized]) return iconMap[capitalized];
    // Fallback to Sparkles if icon not found
    return Sparkles;
  };
  const BadgeIcon = getBadgeIcon();
  const PrimaryButtonIcon = buttons?.primary?.icon
    ? iconMap[buttons.primary.icon] ||
      iconMap[
        buttons.primary.icon.charAt(0).toUpperCase() +
          buttons.primary.icon.slice(1)
      ] ||
      ArrowRight
    : ArrowRight;

  // Helper functions
  const getBadgeVariant = (): BadgeVariantType => {
    if (variant === "lab") return "lab";
    if (badgeVariant === "default") return "periwinkle";
    return badgeVariant;
  };

  const getPrimaryButtonVariant = ():
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "dark"
    | "periwinkle"
    | "white"
    | "tropical-indigo"
    | "gradient"
    | "glass"
    | "gradient-border" => {
    if (variant === "lab") {
      return buttons?.primary?.variant === "gradient" ||
        buttons?.primary?.variant === "glass"
        ? buttons.primary.variant
        : "gradient";
    }
    return "periwinkle";
  };

  const getSecondaryButtonVariant = ():
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "dark"
    | "periwinkle"
    | "white"
    | "tropical-indigo"
    | "gradient"
    | "glass"
    | "gradient-border" => {
    if (variant === "lab") {
      return buttons?.secondary?.variant === "glass" ||
        buttons?.secondary?.variant === "gradient"
        ? buttons.secondary.variant
        : "glass";
    }
    return "outline";
  };

  const getPrimaryButtonClassName = (): string => {
    if (variant === "lab") {
      return "px-8 py-6 text-lg";
    }
    return "bg-jordy-blue hover:bg-dark-purple text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-thistle transition-all duration-300 hover:shadow-xl hover:shadow-wisteria";
  };

  const getSecondaryButtonClassName = (): string => {
    if (variant === "lab") {
      return "px-8 py-6 text-lg";
    }
    return "border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-6 text-lg rounded-xl transition-all duration-300";
  };

  const getTitleGradientClasses = (): string => {
    if (variant === "lab") {
      return titleGradientVariants({ variant: "lab" });
    }
    return titleGradientVariants({ variant, badgeVariant });
  };

  // Override maxWidth for simple variant if not explicitly set
  const effectiveMaxWidth =
    variant === "simple" && maxWidth === "max-w-7xl" ? "max-w-6xl" : maxWidth;

  // Animation duration helper
  const isFullscreenOrLab = variant === "fullscreen" || variant === "lab";
  const animationDuration = isFullscreenOrLab ? 0.8 : 0.6;

  // Motion div style
  const motionStyle =
    scrollAnimation && variant === "fullscreen" && opacity && scale
      ? { opacity, scale }
      : undefined;

  return (
    <section ref={containerRef} className={sectionVariants({ variant })}>
      {/* Blob Backgrounds */}
      <div className={blobContainerVariants({ variant })}>
        {defaultBlobs.map((blob, index) => {
          const animatedClass = blob.animated !== false ? "animate-blob" : "";

          return (
            <div
              key={`${blob.position}-${blob.horizontal}-${blob.color}-${index}`}
              className={cn(
                "absolute w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-20",
                blob.position,
                blob.horizontal,
                blob.color,
                animatedClass,
                blobDelayVariants({
                  delay: (blob.delay as 0 | 2000 | 4000) || 0,
                }),
              )}
            />
          );
        })}
      </div>

      {/* Content */}
      <motion.div
        style={motionStyle}
        className={cn(
          "relative z-10 mx-auto px-6 text-center",
          effectiveMaxWidth,
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: animationDuration,
            ease: "easeOut",
          }}
        >
          {/* Badge */}
          {badge && (
            <Badge
              variant={getBadgeVariant()}
              size="lg"
              rounded={true}
              className="mb-8"
            >
              {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
              {badge.text}
            </Badge>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: animationDuration,
              delay: isFullscreenOrLab ? 0.1 : 0,
              ease: "easeOut",
            }}
            className={cn(
              titleVariants({
                variant,
                size:
                  titleSize === "text-6xl md:text-7xl lg:text-8xl"
                    ? "large"
                    : "default",
              }),
              titleSize,
            )}
          >
            {title.line1}
            {title.line2 && variant !== "simple" && (
              <>
                <br />
                <span className={getTitleGradientClasses()}>{title.line2}</span>
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
              duration: animationDuration,
              delay: isFullscreenOrLab ? 0.2 : 0,
              ease: "easeOut",
            }}
            className={descriptionVariants({ variant })}
          >
            {description}
          </motion.p>

          {/* Buttons */}
          {buttons && (buttons.primary || buttons.secondary) && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: animationDuration,
                delay: isFullscreenOrLab ? 0.3 : 0,
                ease: "easeOut",
              }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8"
            >
              {buttons.primary && (
                <Link href={buttons.primary.href}>
                  <Button
                    size="lg"
                    variant={getPrimaryButtonVariant()}
                    className={getPrimaryButtonClassName()}
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
                    variant={getSecondaryButtonVariant()}
                    className={getSecondaryButtonClassName()}
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
