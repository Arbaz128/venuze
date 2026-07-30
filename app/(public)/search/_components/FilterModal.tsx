"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";
import { FilterChip } from "./FilterChip";
import { RangeSlider } from "@/components/ui/RangeSlider";
import { Toggle } from "@/components/ui/Toggle";

const venueTypeOptions = [
  "Office Space", "Meeting", "Private Party", "Villa", "Bar",
  "Loft", "Apartment", "Ballroom", "Restaurant", "Studio",
  "House", "Gallery",
];

const occasionOptions = [
  "Wedding", "Reception", "Ceremony", "Engagement", "Birthday",
  "Babyshower", "Concert/Performance", "Brand Launch", "Fashion Show",
  "Corporate Event", "Conference", "Pop-up",
];

export function FilterModal() {
  const filters = useFilterStore((s) => s.filters);
  const setFilters = useFilterStore((s) => s.setFilters);
  const toggleVenueType = useFilterStore((s) => s.toggleVenueType);
  const toggleOccasion = useFilterStore((s) => s.toggleOccasion);
  const resetFilters = useFilterStore((s) => s.resetFilters);
  const open = useFilterStore((s) => s.isFilterModalOpen);
  const close = useFilterStore((s) => s.closeFilterModal);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/50 animate-in fade-in duration-300"
        onClick={close}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        className="fixed z-50 bg-white dark:bg-dark-bg shadow-xl overflow-y-auto scrollbar-hide
          inset-0 animate-in slide-in-from-bottom fill-mode-both duration-300
          md:left-auto md:top-0 md:right-0 md:w-[400px] md:h-[100dvh] md:rounded-none md:shadow-[-4px_0_20px_rgba(0,0,0,0.1)] md:animate-in md:slide-in-from-right md:fill-mode-both md:duration-300"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-border dark:border-neutral-300 bg-white dark:bg-dark-bg px-6 py-4">
          <h2 className="text-[18px] font-[600] text-black dark:text-dark-text">Filters</h2>
          <button
            onClick={close}
            aria-label="Close modal"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-300 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-6">
          <section>
            <h3 className="text-[14px] font-[600] text-black dark:text-dark-text mb-3">Venue Type</h3>
            <div className="flex flex-wrap gap-1.5">
              {venueTypeOptions.map((type) => (
                <FilterChip
                  key={type}
                  label={type}
                  selected={filters.venueTypes.includes(type)}
                  onClick={() => toggleVenueType(type)}
                />
              ))}
            </div>
          </section>

          <div className="w-full h-px bg-neutral-border dark:bg-neutral-300" />

          <section>
            <h3 className="text-[14px] font-[600] text-black dark:text-dark-text mb-1">Capacity</h3>
            <p className="text-[12px] font-[400] text-neutral-text-muted mb-3">
              Showing venues for {filters.capacityRange[0]} - {filters.capacityRange[1]} guests
            </p>
            <RangeSlider
              min={10}
              max={1500}
              value={filters.capacityRange}
              onChange={(val) => setFilters({ capacityRange: val })}
              formatLabel={(v) => v.toLocaleString()}
            />
          </section>

          <div className="w-full h-px bg-neutral-border dark:bg-neutral-300" />

          <section>
            <h3 className="text-[14px] font-[600] text-black dark:text-dark-text mb-1">Price per hour (AED)</h3>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] font-[400] text-neutral-text-muted">AED {filters.priceRange[0]}.00</span>
              <span className="text-[13px] font-[400] text-neutral-text-muted">AED {filters.priceRange[1]}.00</span>
            </div>
            <RangeSlider
              min={10}
              max={30000}
              value={filters.priceRange}
              onChange={(val) => setFilters({ priceRange: val })}
            />
          </section>

          <div className="w-full h-px bg-neutral-border dark:bg-neutral-300" />

          <section>
            <h3 className="text-[14px] font-[600] text-black dark:text-dark-text mb-3">Event / Occasion</h3>
            <div className="flex flex-wrap gap-1.5">
              {occasionOptions.map((occ) => (
                <FilterChip
                  key={occ}
                  label={occ}
                  selected={filters.occasions.includes(occ)}
                  onClick={() => toggleOccasion(occ)}
                />
              ))}
            </div>
          </section>

          <div className="w-full h-px bg-neutral-border dark:bg-neutral-300" />

          <section className="flex items-center justify-between">
            <div>
              <h3 className="text-[14px] font-[600] text-black dark:text-dark-text">Verified Only</h3>
              <p className="text-[12px] font-[400] text-neutral-text-muted">
                Show only verified venues
              </p>
            </div>
            <Toggle
              checked={filters.verifiedOnly}
              onChange={() => setFilters({ verifiedOnly: !filters.verifiedOnly })}
            />
          </section>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-dark-bg border-t border-neutral-border dark:border-neutral-300 px-6 py-4 flex items-center gap-3">
          <button
            onClick={() => { resetFilters(); close(); }}
            className="flex-1 border border-neutral-300 text-neutral-text-muted rounded-[10px] py-2.5 text-[13px] font-[500] hover:bg-neutral-50 dark:hover:bg-neutral-300 transition-colors"
          >
            Clear All
          </button>
          <button
            onClick={close}
            className="flex-1 bg-brand text-white rounded-[10px] py-2.5 text-[13px] font-[500] hover:opacity-90 transition-opacity"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
}
