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
      className={cn("inline-flex rounded-full border border-border bg-muted p-1 shadow-inner", className)}
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
            disabled={disabled}
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-extrabold transition duration-200 disabled:cursor-not-allowed disabled:opacity-60",
              selected
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
