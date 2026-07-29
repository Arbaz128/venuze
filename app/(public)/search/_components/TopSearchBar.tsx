"use client";

import Image from "next/image";
import { Search, Plus, Globe, User, Menu } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";
import { LocationField } from "@/app/_components/LocationField";
import { DateField } from "@/app/_components/DateField";
import { GuestField } from "@/app/_components/GuestField";

export function TopSearchBar() {
  const filters = useFilterStore((s) => s.filters);
  const setFilters = useFilterStore((s) => s.setFilters);

  const handleSearch = () => {
    setFilters({
      location: filters.location || "London, UK",
      page: 1,
    });
  };

  return (
    <header className="h-[88px] bg-white border-b border-neutral-200 shadow-[0_4px_10px_rgba(0,0,0,0.1)] flex items-center px-4 md:px-8">
      <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
        <div className="flex items-center gap-6">
          <a href="/" className="flex items-center flex-shrink-0">
            <Image src="/images/logo.svg" alt="Venuze" width={110} height={20} className="h-5 w-auto" />
          </a>

          <div className="hidden md:flex items-center bg-white border border-neutral-300 rounded-full shadow-sm max-w-[430px] w-full">
            <div className="flex-1 min-w-0">
              <LocationField
                value={filters.location}
                onChange={(v) => setFilters({ location: v })}
                variant="compact"
              />
            </div>
            <div className="w-px h-8 bg-neutral-200" />
            <div className="flex-1 min-w-0">
              <DateField
                value={filters.dateRange}
                onChange={(v) => setFilters({ dateRange: v })}
                variant="compact"
              />
            </div>
            <div className="w-px h-8 bg-neutral-200" />
            <div className="flex-1 min-w-0">
              <GuestField
                value={filters.guests}
                onChange={(v) => setFilters({ guests: v })}
                variant="compact"
              />
            </div>
            <button
              onClick={handleSearch}
              className="mr-1.5 h-9 w-9 rounded-[10px] bg-brand flex items-center justify-center flex-shrink-0"
              aria-label="Search"
            >
              <Search size={16} className="text-white" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="hidden md:flex items-center gap-1.5 bg-white border border-neutral-300 rounded-full px-4 py-2 text-[13px] font-[500] text-neutral-text-muted hover:shadow-sm transition-shadow">
            <Plus size={14} />
            Add your listing
          </button>
          <button className="hidden md:flex items-center gap-1.5 bg-white border border-neutral-300 rounded-full px-3 py-2 text-[13px] font-[500] text-neutral-text-muted hover:shadow-sm transition-shadow">
            <Globe size={14} />
            EN
          </button>
          <button className="hidden md:flex h-9 w-9 items-center justify-center rounded-full bg-white border border-neutral-300 hover:shadow-sm transition-shadow" aria-label="Profile">
            <User size={16} className="text-neutral-text-muted" />
          </button>
          <button className="md:hidden h-9 w-9 flex items-center justify-center rounded-full bg-white border border-neutral-300" aria-label="Menu">
            <Menu size={18} className="text-neutral-text-muted" />
          </button>
        </div>
      </div>
    </header>
  );
}
