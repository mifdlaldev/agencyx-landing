"use client";

import { cn } from "@/lib/utils";

type ToggleOption = {
  value: string;
  label: string;
  description?: string;
};

export function Toggle({
  label,
  options,
  value,
  onChange,
  className,
  disabled = false,
}: {
  label: string;
  options: readonly ToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}) {
  return (
    <div
      className={cn("inline-flex rounded-full border border-line bg-white/55 p-1 shadow-sm backdrop-blur dark:bg-white/[0.06]", className)}
      role="group"
      aria-label={label}
    >
      {options.map((option) => {
        const selected = option.value === value;

        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            title={option.description}
            onClick={() => onChange(option.value)}
            disabled={disabled}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-bold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
              selected
                ? "bg-ink text-canvas shadow-sm dark:bg-brand dark:text-brand-ink"
                : "text-muted hover:bg-white/75 hover:text-ink dark:hover:bg-white/10 dark:hover:text-ink",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
