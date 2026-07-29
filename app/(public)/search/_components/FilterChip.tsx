"use client";

import { cn } from "@/lib/utils";

interface FilterChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  size?: "sm" | "md";
}

export function FilterChip({ label, selected, onClick, size = "md" }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-full border transition-all font-[500] leading-none",
        size === "sm"
          ? "px-3 py-1.5 text-[11px]"
          : "px-4 py-2.5 text-[13px]",
        selected
          ? "bg-brand text-white border-brand"
          : "bg-neutral-50 text-neutral-text-chip border-transparent hover:border-neutral-300"
      )}
    >
      {label}
    </button>
  );
}
