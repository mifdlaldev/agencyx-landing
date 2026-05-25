import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardVariant = "default" | "elevated" | "dark" | "glass" | "outline";

const variantClasses: Record<CardVariant, string> = {
  default: "border-border bg-white text-foreground",
  elevated: "border-border bg-white text-foreground shadow-soft",
  dark: "border-white/10 bg-dark text-white shadow-[0_30px_120px_-60px_rgba(0,0,0,0.75)]",
  glass: "border-white/50 bg-white/70 text-foreground shadow-soft backdrop-blur-xl",
  outline: "border-border bg-transparent text-foreground",
};

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
  variant?: CardVariant;
};

export function Card({ className, interactive = false, variant = "default", ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border p-6 transition duration-300",
        variantClasses[variant],
        interactive && "hover:-translate-y-1 hover:border-primary/30 hover:shadow-blue motion-reduce:transform-none",
        className,
      )}
      {...props}
    />
  );
}
