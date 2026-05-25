import { cn } from "@/lib/utils";

type BeamProps = {
  className?: string;
  variant?: "blue" | "violet" | "cyan";
};

const colorByVariant = {
  blue: "stroke-primary",
  violet: "stroke-secondary",
  cyan: "stroke-cyan-500",
} as const;

export function AnimatedBeam({ className, variant = "blue" }: BeamProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 420 180"
      className={cn("pointer-events-none absolute h-44 w-[26rem] opacity-70", className)}
      fill="none"
    >
      <path
        d="M12 132 C 112 28, 236 28, 408 70"
        className={cn("animate-beam-dash", colorByVariant[variant])}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="10 14"
      />
      <path
        d="M22 154 C 124 92, 232 112, 390 24"
        className={cn("animate-beam-dash", colorByVariant[variant])}
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="6 16"
        opacity="0.55"
      />
    </svg>
  );
}
