import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto", {
  variants: {
    size: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      "2xl": "max-w-360",
      full: "max-w-full",
    },
    paddingX: {
      none: "px-0",
      sm: "px-4",
      md: "px-6",
      lg: "px-8",
      xl: "px-12",
    },
    paddingY: {
      none: "py-0",
      sm: "py-4",
      md: "py-6",
      lg: "py-8",
      xl: "py-12",
      "2xl": "py-16",
      "3xl": "py-20",
      "4xl": "py-32",
    },
  },
  defaultVariants: {
    size: "xl",
    paddingX: "md",
    paddingY: "sm",
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: "div" | "section" | "main" | "article" | "header" | "footer";
}

const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      className,
      size,
      paddingX,
      paddingY,
      as: Component = "div",
      ...props
    },
    ref,
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          containerVariants({ size, paddingX, paddingY }),
          className,
        )}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Container.displayName = "Container";

export default Container;
