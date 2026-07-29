"use client";

import { X, Map, List } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";
import { cn } from "@/lib/utils";

interface ResultsHeaderProps {
  total: number;
}

export function ResultsHeader({ total }: ResultsHeaderProps) {
  const filters = useFilterStore((s) => s.filters);
  const setFilters = useFilterStore((s) => s.setFilters);
  const toggleVenueType = useFilterStore((s) => s.toggleVenueType);
  const toggleOccasion = useFilterStore((s) => s.toggleOccasion);
  const toggleMapView = useFilterStore((s) => s.toggleMapView);
  const isMapView = useFilterStore((s) => s.isMapView);
  const resetFilters = useFilterStore((s) => s.resetFilters);

  const activeChips: { label: string; onRemove: () => void }[] = [];

  if (filters.verifiedOnly) {
    activeChips.push({
      label: "Verified",
      onRemove: () => setFilters({ verifiedOnly: false }),
    });
  }

  filters.venueTypes.forEach((t) => {
    activeChips.push({
      label: t,
      onRemove: () => toggleVenueType(t),
    });
  });

  filters.occasions.forEach((o) => {
    activeChips.push({
      label: o,
      onRemove: () => toggleOccasion(o),
    });
  });

  const hasActiveFilters = activeChips.length > 0;

  return (
    <div className="flex items-center justify-between px-4 md:px-8 py-3 border-b border-neutral-200">
      <div className="flex items-center gap-3 overflow-hidden">
        <span className="text-[14px] font-[400] text-neutral-text-muted2 whitespace-nowrap">
          {total} {filters.category === "all" ? "spaces" : filters.category} near{" "}
          {filters.location || "London, UK"}
        </span>

        {activeChips.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {activeChips.map((chip) => (
              <button
                key={chip.label}
                onClick={chip.onRemove}
                className="flex items-center gap-1 bg-neutral-100 rounded-full px-3 py-1 text-[11px] font-[500] text-neutral-text-dark whitespace-nowrap hover:bg-neutral-200 transition-colors"
              >
                {chip.label}
                <X size={12} />
              </button>
            ))}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-[500] text-brand whitespace-nowrap hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({ sortBy: e.target.value as typeof filters.sortBy })}
          className="text-[12px] font-[500] text-neutral-text-muted bg-white border border-neutral-250 rounded-lg px-3 py-1.5 outline-none cursor-pointer"
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
              : "bg-white/85 border-neutral-250 text-neutral-text-muted hover:bg-neutral-100"
          )}
          aria-label={isMapView ? "Show list" : "Show map"}
        >
          {isMapView ? <List size={18} /> : <Map size={18} />}
        </button>
      </div>
    </div>
  );
}
