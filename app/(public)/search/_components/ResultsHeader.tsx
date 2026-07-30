"use client";

import { Map, List } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";
import { cn } from "@/lib/utils";

interface ResultsHeaderProps {
  total: number;
}

export function ResultsHeader({ total }: ResultsHeaderProps) {
  const filters = useFilterStore((s) => s.filters);
  const setFilters = useFilterStore((s) => s.setFilters);
  const toggleMapView = useFilterStore((s) => s.toggleMapView);
  const isMapView = useFilterStore((s) => s.isMapView);

  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-3 border-b border-neutral-200 dark:border-neutral-300">
      <div className="flex items-center gap-3 overflow-hidden">
        <span className="text-[14px] font-[400] text-neutral-text-muted2 dark:text-neutral-text-muted whitespace-nowrap">
          {total} {filters.category === "all" ? "spaces" : filters.category} near{" "}
          {filters.location || "London, UK"}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ sortBy: e.target.value as typeof filters.sortBy })}
          className="text-[12px] font-[500] text-neutral-text-muted bg-white dark:bg-dark-card border border-neutral-250 dark:border-neutral-300 rounded-lg px-3 py-1.5 outline-none cursor-pointer"
        >
          <option value="recommended">Sort by: Recommended</option>
          <option value="price_low">Price (Low to High)</option>
          <option value="price_high">Price (High to Low)</option>
          <option value="rating">Rating</option>
        </select>

        <button
          onClick={toggleMapView}
          className={cn(
            "h-[44px] w-[44px] rounded-full border flex items-center justify-center transition-colors",
            isMapView
              ? "bg-brand text-white border-brand"
              : "bg-white/85 dark:bg-dark-card border-neutral-250 dark:border-neutral-300 text-neutral-text-muted hover:bg-neutral-100 dark:hover:bg-neutral-300"
          )}
          aria-label={isMapView ? "Show list" : "Show map"}
        >
          {isMapView ? <List size={18} /> : <Map size={18} />}
        </button>
      </div>
    </div>
  );
}
