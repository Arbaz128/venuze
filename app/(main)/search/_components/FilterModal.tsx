"use client";

import { useFilterStore } from "@/store/filterStore";
import { Modal, ModalHeader } from "@/components/ui/Modal";
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

  return (
    <Modal open={open} onClose={close} mobileSheet>
      <ModalHeader onClose={close}>Filters</ModalHeader>

      <div className="px-6 py-5 space-y-6 overflow-y-auto">
        {/* Venue Type */}
        <section>
          <h3 className="text-[14px] font-[600] text-black mb-3">Venue Type</h3>
          <div className="flex flex-wrap gap-2">
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

        <div className="w-full h-px bg-neutral-border" />

        {/* Capacity */}
        <section>
          <h3 className="text-[14px] font-[600] text-black mb-1">Capacity</h3>
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

        <div className="w-full h-px bg-neutral-border" />

        {/* Price */}
        <section>
          <h3 className="text-[14px] font-[600] text-black mb-1">Price per hour (AED)</h3>
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

        <div className="w-full h-px bg-neutral-border" />

        {/* Occasion */}
        <section>
          <h3 className="text-[14px] font-[600] text-black mb-3">Event / Occasion</h3>
          <div className="flex flex-wrap gap-2">
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

        <div className="w-full h-px bg-neutral-border" />

        {/* Verified Only */}
        <section className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-[600] text-black">Verified Only</h3>
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

      <div className="sticky bottom-0 bg-white border-t border-neutral-border px-6 py-4 flex items-center gap-3">
        <button
          onClick={resetFilters}
          className="flex-1 border border-neutral-300 text-neutral-text-muted rounded-[10px] py-2.5 text-[13px] font-[500] hover:bg-neutral-50 transition-colors"
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
    </Modal>
  );
}
