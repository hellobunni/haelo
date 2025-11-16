import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import Link from "next/link";
import type * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  // Base styles - layout, typography, interactions, accessibility, states, and icon styles
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-300 cursor-pointer outline-none shrink-0",
    "disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring",
    "aria-invalid:ring-destructive/20 aria-invalid:border-destructive dark:aria-invalid:ring-destructive/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 rounded-md",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60 rounded-md",
        outline:
          "border bg-background shadow-xs text-gray-600 hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 rounded-md",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md",
        ghost:
          "bg-transparent text-slate-500 text-base hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 rounded-md",
        link: "text-primary underline-offset-4 hover:underline rounded-none",
        dark: "bg-dark-purple-2 text-white hover:bg-dark-purple-3 shadow-lg hover:scale-105 rounded-md",
        periwinkle:
          "bg-periwinkle-500 text-white hover:bg-periwinkle-700 shadow-lg shadow-periwinkle-200 hover:shadow-xl hover:shadow-periwinkle-300 rounded-md",
        white:
          "bg-white text-black/70 hover:bg-gray-50 shadow-lg hover:shadow-xl rounded-md",
        "tropical-indigo":
          "bg-tropical-indigo-2 text-white hover:bg-tropical-indigo/90 shadow-lg hover:shadow-xl rounded-md",
        gradient:
          "bg-linear-to-r from-purple-500 via-blue-500 to-teal-500 text-white hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] rounded-full",
        glass:
          "bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10 rounded-full",
        "gradient-border":
          "bg-linear-to-r from-purple-500/20 to-teal-500/20 border border-purple-500/30 text-white hover:border-purple-500/50 rounded-full",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 px-6 has-[>svg]:px-4",
        xl: "h-12 px-8 has-[>svg]:px-6",
        full: "h-12 px-8 w-full has-[>svg]:px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
      rounded: {
        true: "rounded-xl!",
        false: "rounded-none!",
        lg: "rounded-lg!",
        full: "rounded-full!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
  className?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  "aria-expanded"?: boolean;
  "aria-pressed"?: boolean | "mixed";
  "aria-busy"?: boolean;
  // Motion props (optional, with defaults)
  initial?: boolean | { opacity?: number; y?: number; scale?: number };
  animate?: { opacity?: number; y?: number; scale?: number };
  transition?: { duration?: number; ease?: string | number[] };
};

type ButtonProps = ButtonBaseProps &
  (
    | (React.ComponentProps<"button"> & { href?: never })
    | (React.ComponentProps<typeof Link> & { href: string })
    | (React.ComponentProps<"a"> & { href: string })
  );

function Button({
  className,
  variant,
  size,
  rounded,
  asChild = false,
  href,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  "aria-expanded": ariaExpanded,
  "aria-pressed": ariaPressed,
  "aria-busy": ariaBusy,
  initial = { opacity: 0, y: 4 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 0.2, ease: "easeOut" },
  ...props
}: ButtonProps) {
  const isExternal =
    href &&
    (href.startsWith("mailto:") ||
      href.startsWith("https://") ||
      href.startsWith("http://") ||
      href.startsWith("www.") ||
      href.startsWith("//"));

  // Accessibility props
  const accessibilityProps = {
    "aria-label": ariaLabel,
    "aria-describedby": ariaDescribedBy,
    "aria-expanded": ariaExpanded,
    "aria-pressed": ariaPressed,
    "aria-busy": ariaBusy,
  };

  // Remove undefined accessibility props
  const cleanAccessibilityProps = Object.fromEntries(
    Object.entries(accessibilityProps).filter(
      ([_, value]) => value !== undefined,
    ),
  ) as Record<string, string | boolean | "mixed">;

  // Motion props
  const motionProps = {
    initial: initial === false ? undefined : initial,
    animate: initial === false ? undefined : animate,
    // biome-ignore lint/suspicious/noExplicitAny: Motion transition types are complex and require any
    transition: transition as any,
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  // Exclude conflicting drag handlers from props
  // biome-ignore lint/correctness/noUnusedVariables: These are intentionally destructured to exclude them
  // biome-ignore lint/suspicious/noExplicitAny: Props need to be cast to any for destructuring
  const { onDrag, onDragStart, onDragEnd, ...restProps } = props as any;

  if (asChild) {
    // For asChild, wrap Slot in motion.div to preserve motion behavior
    return (
      <motion.div {...motionProps} className="inline-flex">
        {/* biome-ignore lint/a11y/useSemanticElements: Slot can render as different elements, role is needed for flexibility */}
        <Slot
          data-slot="button"
          role="button"
          className={cn(buttonVariants({ variant, size, rounded }), className)}
          {...cleanAccessibilityProps}
          {...restProps}
        />
      </motion.div>
    );
  }

  if (href && !isExternal) {
    const { href: _, ...linkProps } = restProps as React.ComponentProps<
      typeof Link
    > & { href: string };
    const MotionLink = motion(Link);
    return (
      <MotionLink
        data-slot="button"
        href={href}
        className={cn(buttonVariants({ variant, size, rounded }), className)}
        // biome-ignore lint/suspicious/noExplicitAny: Motion props need to be spread with any
        {...(motionProps as any)}
        {...cleanAccessibilityProps}
        // biome-ignore lint/suspicious/noExplicitAny: Link props need to be spread with any
        {...(linkProps as any)}
      />
    );
  }

  if (href && isExternal) {
    return (
      <motion.a
        data-slot="button"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant, size, rounded }), className)}
        // biome-ignore lint/suspicious/noExplicitAny: Motion props need to be spread with any
        {...(motionProps as any)}
        {...cleanAccessibilityProps}
        // biome-ignore lint/suspicious/noExplicitAny: Rest props need to be spread with any
        {...(restProps as any)}
      />
    );
  }

  return (
    <motion.button
      data-slot="button"
      type={(restProps as React.ComponentProps<"button">).type || "button"}
      className={cn(buttonVariants({ variant, size, rounded }), className)}
      // biome-ignore lint/suspicious/noExplicitAny: Motion props need to be spread with any
      {...(motionProps as any)}
      {...cleanAccessibilityProps}
      // biome-ignore lint/suspicious/noExplicitAny: Rest props need to be spread with any
      {...(restProps as any)}
    />
  );
}

export { Button, buttonVariants };
export type { ButtonProps };
