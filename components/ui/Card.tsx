import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  interactive?: boolean;
};

export function Card({ className, interactive = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass-panel rounded-[2rem] p-6 transition duration-300",
        interactive && "hover:-translate-y-1 hover:border-brand/60 hover:shadow-glow motion-reduce:transform-none",
        className,
      )}
      {...props}
    />
  );
}
