import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-canvas shadow-glow hover:-translate-y-0.5 hover:bg-ink/90 dark:bg-brand dark:text-brand-ink dark:hover:bg-brand/90",
  secondary:
    "bg-brand text-brand-ink shadow-glow hover:-translate-y-0.5 hover:bg-brand/90",
  ghost: "text-ink hover:bg-ink/8 dark:text-ink dark:hover:bg-white/10",
  outline:
    "border border-line bg-white/45 text-ink hover:-translate-y-0.5 hover:border-brand hover:bg-brand-soft/70 dark:bg-white/[0.04] dark:hover:bg-white/[0.08]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold tracking-[-0.01em] transition duration-200 motion-reduce:transform-none",
    "disabled:pointer-events-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, variant, size, type = "button", ...props },
  ref,
) {
  return <button ref={ref} type={type} className={buttonStyles({ variant, size, className })} {...props} />;
});
