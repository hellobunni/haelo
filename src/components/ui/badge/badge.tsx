import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import type * as React from "react";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  // Base styles - layout, typography, interactions, accessibility
  [
    "inline-flex items-center justify-center border w-fit whitespace-nowrap shrink-0 overflow-hidden",
    "transition-[color,box-shadow,background-color,border-color]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-ring",
    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40",
    "[&>svg]:pointer-events-none [&>svg]:shrink-0 gap-1",
  ],
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "text-foreground border-border [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        success:
          "border-transparent bg-green-500/20 text-green-600 dark:bg-green-500/30 dark:text-green-400",
        warning:
          "border-transparent bg-yellow-500/20 text-yellow-600 dark:bg-yellow-500/30 dark:text-yellow-400",
        info: "border-transparent bg-blue-500/20 text-blue-600 dark:bg-blue-500/30 dark:text-blue-400",
        // Hero-specific variants
        periwinkle:
          "bg-pale-purple border-periwinkle-200 text-dark-purple [&>svg]:text-jordy-blue",
        blank:
          "bg-white border-periwinkle-200 text-dark-purple-2 [&>svg]:text-jordy-blue",
        dark: "bg-dark-purple-2 border-periwinkle-200 text-white [&>svg]:text-white",
        // Lab-specific variant (glassmorphism)
        lab: "bg-white/5 backdrop-blur-sm border-white/10 text-gray-300 [&>svg]:text-purple-400",
        // Resume-specific variants
        "resume-purple":
          "bg-resume-purple-1/10 border-resume-purple-1/30 text-slate-600",
        "resume-pink":
          "bg-resume-pink-1/10 border-resume-purple-1/30 text-slate-600",
      },
      size: {
        sm: "px-2 py-0.5 text-xs [&>svg]:size-3 rounded-md",
        default: "px-2.5 py-0.5 text-xs [&>svg]:size-3 rounded-md",
        lg: "px-4 py-1.5 text-sm [&>svg]:size-4 rounded-lg font-medium",
      },
      rounded: {
        true: "rounded-full!",
        false: "rounded-none!",
        default: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type BadgeBaseProps = VariantProps<typeof badgeVariants> & {
  asChild?: boolean;
  className?: string;
  "aria-label"?: string;
  // Motion props (optional, with defaults)
  initial?: boolean | { opacity?: number; y?: number; scale?: number };
  animate?: { opacity?: number; y?: number; scale?: number };
  transition?: { duration?: number; ease?: string | number[] };
};

type BadgeProps = BadgeBaseProps & React.ComponentProps<"span">;

function Badge({
  className,
  variant,
  size,
  rounded,
  asChild = false,
  "aria-label": ariaLabel,
  initial = { opacity: 0, scale: 0.8 },
  animate = { opacity: 1, scale: 1 },
  transition = { duration: 0.2, ease: "easeOut" },
  ...props
}: BadgeProps) {
  // Motion props
  const motionProps = {
    initial: initial === false ? undefined : initial,
    animate: initial === false ? undefined : animate,
    // biome-ignore lint/suspicious/noExplicitAny: Motion transition types are complex and require any
    transition: transition as any,
    whileHover: { scale: 1.05 },
  };

  // Accessibility props
  const accessibilityProps = {
    "aria-label": ariaLabel,
  };

  const cleanAccessibilityProps = Object.fromEntries(
    Object.entries(accessibilityProps).filter(
      ([_, value]) => value !== undefined,
    ),
  ) as Record<string, string>;

  if (asChild) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Slot
          data-slot="badge"
          className={cn(badgeVariants({ variant, size, rounded }), className)}
          {...cleanAccessibilityProps}
          {...props}
        />
      </motion.div>
    );
  }

  return (
    <motion.span
      data-slot="badge"
      className={cn(badgeVariants({ variant, size, rounded }), className)}
      // biome-ignore lint/suspicious/noExplicitAny: Motion props need to be spread with any
      {...(motionProps as any)}
      {...cleanAccessibilityProps}
      // biome-ignore lint/suspicious/noExplicitAny: Component props need to be spread with any
      {...(props as any)}
    />
  );
}

export { Badge, badgeVariants };
export type { BadgeProps };
