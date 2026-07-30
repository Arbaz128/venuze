"use client";

import { X } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";

export function ActiveFilterChips() {
  const filters = useFilterStore((s) => s.filters);
  const setFilters = useFilterStore((s) => s.setFilters);
  const toggleVenueType = useFilterStore((s) => s.toggleVenueType);
  const toggleOccasion = useFilterStore((s) => s.toggleOccasion);
  const resetFilters = useFilterStore((s) => s.resetFilters);

  const chips: { key: string; label: string; onRemove: () => void }[] = [];

  if (filters.verifiedOnly) {
    chips.push({
      key: "verified",
      label: "Verified",
      onRemove: () => setFilters({ verifiedOnly: false }),
    });
  }

  filters.venueTypes.forEach((t) => {
    chips.push({
      key: `vt-${t}`,
      label: t,
      onRemove: () => toggleVenueType(t),
    });
  });

  filters.occasions.forEach((o) => {
    chips.push({
      key: `occ-${o}`,
      label: o,
      onRemove: () => toggleOccasion(o),
    });
  });

  const hasNonDefaultCapacity =
    filters.capacityRange[0] > 10 || filters.capacityRange[1] < 1500;
  if (hasNonDefaultCapacity) {
    chips.push({
      key: "capacity",
      label: `${filters.capacityRange[0]} - ${filters.capacityRange[1]} guests`,
      onRemove: () => setFilters({ capacityRange: [10, 1500] }),
    });
  }

  const hasNonDefaultPrice =
    filters.priceRange[0] > 10 || filters.priceRange[1] < 30000;
  if (hasNonDefaultPrice) {
    chips.push({
      key: "price",
      label: `AED ${filters.priceRange[0]} - AED ${filters.priceRange[1]}`,
      onRemove: () => setFilters({ priceRange: [10, 30000] }),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex items-center gap-2 px-4 md:px-8 py-2 border-b border-neutral-200 dark:border-neutral-300">
      <div className="flex flex-wrap items-center gap-1.5">
        {chips.map((chip) => (
          <button
            key={chip.key}
            onClick={chip.onRemove}
            className="inline-flex items-center gap-1 bg-neutral-100 dark:bg-neutral-300 rounded-full px-3 py-1 text-[11px] font-[500] text-neutral-text-dark dark:text-dark-text whitespace-nowrap hover:bg-neutral-200 dark:hover:bg-neutral-400 transition-colors"
          >
            {chip.label}
            <X size={12} />
          </button>
        ))}
        <button
          onClick={resetFilters}
          className="text-[11px] font-[500] text-brand whitespace-nowrap hover:underline"
        >
          Clear all
        </button>
      </div>
    </div>
  );
}
