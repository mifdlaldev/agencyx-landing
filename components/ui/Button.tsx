import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "dark" | "glow";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-primary text-primary-foreground shadow-blue hover:bg-primary/90",
  secondary: "bg-white text-foreground shadow-soft hover:bg-muted",
  outline: "border border-border bg-white/70 text-foreground hover:border-primary/35 hover:bg-white",
  ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
  dark: "bg-foreground text-white hover:bg-foreground/90",
  glow: "bg-gradient-to-r from-primary to-secondary text-white shadow-blue hover:shadow-[0_30px_100px_-45px_rgba(30,64,237,0.85)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 py-4 text-base",
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
    "inline-flex items-center justify-center gap-2 rounded-full font-extrabold tracking-[-0.01em] transition duration-200 motion-reduce:transform-none",
    "hover:-translate-y-0.5 disabled:pointer-events-none disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60",
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
