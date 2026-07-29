"use client";

import { Search } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";
import { useHeroSearchStore } from "@/store/heroSearchStore";
import { useSearchViewStore } from "@/store/searchViewStore";
import { LocationField } from "./LocationField";
import { DateField } from "./DateField";
import { GuestField } from "./GuestField";

interface HeroSearchSheetProps {
  open: boolean;
  onClose: () => void;
}

export function HeroSearchSheet({ open, onClose }: HeroSearchSheetProps) {
  const { location, dateRange, guests } = useHeroSearchStore();
  const setLocation = useHeroSearchStore((s) => s.setLocation);
  const setDateRange = useHeroSearchStore((s) => s.setDateRange);
  const setGuests = useHeroSearchStore((s) => s.setGuests);

  const handleSearch = () => {
    useFilterStore.getState().setFilters({
      location: location || "London, UK",
      dateRange,
      guests,
      page: 1,
    });
    useSearchViewStore.getState().showResults();
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col md:hidden">
      <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200">
        <h2 className="text-[16px] font-[600] text-black">Search</h2>
        <button onClick={onClose} className="text-[14px] font-[500] text-brand">Cancel</button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
        <div className="border border-neutral-300 rounded-xl overflow-hidden divide-y divide-neutral-200">
          <LocationField value={location} onChange={setLocation} variant="hero" />
          <DateField value={dateRange} onChange={setDateRange} variant="hero" />
          <GuestField value={guests} onChange={setGuests} variant="hero" />
        </div>
      </div>

      <div className="px-4 pb-6 pt-2 border-t border-neutral-100">
        <button
          onClick={handleSearch}
          className="w-full h-[50px] bg-brand text-white rounded-[12px] text-[15px] font-[600] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Search size={18} />
          Search
        </button>
      </div>
    </div>
  );
}
