import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const pillVariants = cva(
  "inline-flex items-center justify-center font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-black/50 text-white",
        active: "bg-primary text-white",
        outline: "border border-border text-muted bg-white",
        yellow: "bg-accent-yellow text-white",
        verified: "bg-verified text-white text-xs",
        dark: "bg-dark-card text-dark-text",
      },
      size: {
        sm: "px-3 py-1 text-xs rounded-full",
        md: "px-4 py-1.5 text-sm rounded-full",
        lg: "px-5 py-2 text-sm rounded-full",
        dot: "h-2 w-2 rounded-full",
        dotLong: "h-2 w-7 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export interface PillProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof pillVariants> {}

export function Pill({ className, variant, size, children, ...props }: PillProps) {
  return (
    <span className={cn(pillVariants({ variant, size, className }))} {...props}>
      {children}
    </span>
  );
}
