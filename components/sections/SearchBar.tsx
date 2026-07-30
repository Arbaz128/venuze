"use client";

import Image from "next/image";
import { useState } from "react";
import { Search, MapPin, Calendar, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/filterStore";
import { useHeroSearchStore } from "@/store/heroSearchStore";
import { useSearchViewStore } from "@/store/searchViewStore";
import { LocationField } from "@/app/_components/LocationField";
import { DateField } from "@/app/_components/DateField";
import { GuestField } from "@/app/_components/GuestField";
import { HeroSearchSheet } from "@/app/_components/HeroSearchSheet";

type SearchTab = "venue" | "vendors";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const [activeTab, setActiveTab] = useState<SearchTab>("venue");
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const location = useHeroSearchStore((s) => s.location);
  const dateRange = useHeroSearchStore((s) => s.dateRange);
  const guests = useHeroSearchStore((s) => s.guests);
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
  };

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="flex items-center gap-2 bg-white rounded-xl p-1.5 shadow-md z-50 ">
        <button
          onClick={() => setActiveTab("venue")}
          className={cn(
            "flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all",
            activeTab === "venue"
              ? "bg-[#FF5037] text-white"
              : "bg-transparent text-muted-dark hover:text-[#e2452d]"
          )}
        >
          <Image src="/icons/venue.svg" alt="Venue" width={16} height={16} className="h-4 w-4" />
          Venue
        </button>
        <button
          onClick={() => setActiveTab("vendors")}
          className={cn(
            "flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold transition-all",
            activeTab === "vendors"
              ? "bg-[#FF5037] text-white"
              : "bg-transparent text-black hover:text-[#e2452d]"
          )}
        >
          <Image src="/icons/vendors.svg" alt="Vendors" width={16} height={16} className="h-4 w-4" />
          Vendors
        </button>
      </div>

      {/* Desktop: full pill */}
      <div className="hidden lg:flex items-center  -mt-8 bg-white rounded-xl shadow-lg px-2 w-full max-w-[1054px] h-auto min-h-[80px] lg:min-h-[100px]">
        <div className="flex-1 flex items-center gap-6">
          <div className="flex-1 cursor-pointer">
            <LocationField value={location} onChange={setLocation} variant="hero" />
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="flex-1 cursor-pointer">
            <DateField value={dateRange} onChange={setDateRange} variant="hero" />
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="flex-1 cursor-pointer">
            <GuestField value={guests} onChange={setGuests} variant="hero" />
          </div>
        </div>
        <Button variant="primary" size="lg" className="h-[61px] px-8 ml-4 rounded-xl text-lg flex-shrink-0" onClick={handleSearch}>
          <Search className="h-5 w-5" />
          <span>Search</span>
        </Button>
      </div>

      {/* Tablet: single row, compact */}
      <div className="hidden md:flex lg:hidden items-center bg-white rounded-full shadow-lg px-5 w-full max-w-[680px] h-[70px]">
        <div className="flex-1 flex items-center gap-4">
          <LocationField value={location} onChange={setLocation} variant="compact" />
          <div className="w-px h-8 bg-border" />
          <DateField value={dateRange} onChange={setDateRange} variant="compact" />
          <div className="w-px h-8 bg-border" />
          <GuestField value={guests} onChange={setGuests} variant="compact" />
        </div>
        <Button variant="primary" className="h-[50px] w-[50px] rounded-full p-0 ml-3 flex-shrink-0" onClick={handleSearch}>
          <Search className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile: stacked card */}
      <div className="md:hidden bg-white rounded-[10px] shadow-[0px_5px_30px_rgba(0,0,0,0.35)] w-full max-w-[311px] overflow-hidden">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <button
              onClick={() => setActiveTab("venue")}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all",
                activeTab === "venue"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-muted-dark"
              )}
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3" />
                Venue
              </div>
            </button>
            <button
              onClick={() => setActiveTab("vendors")}
              className={cn(
                "px-4 py-1.5 rounded-full text-xs font-semibold transition-all",
                activeTab === "vendors"
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-muted-dark"
              )}
            >
              <div className="flex items-center gap-1.5">
                <Users className="h-3 w-3" />
                Vendors
              </div>
            </button>
          </div>

          <div className="space-y-0">
            <button onClick={() => setMobileSheetOpen(true)} className="w-full flex items-center justify-between py-3 border-b border-[#E0E0E0]">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted" />
                <span className="text-sm text-muted-dark">{location || "Where"}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted" />
            </button>
            <button onClick={() => setMobileSheetOpen(true)} className="w-full flex items-center justify-between py-3 border-b border-[#E0E0E0]">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted" />
                <span className="text-sm text-muted-dark">{dateRange || "When"}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted" />
            </button>
            <button onClick={() => setMobileSheetOpen(true)} className="w-full flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-muted" />
                <span className="text-sm text-muted-dark">{guests || "Guest"}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted" />
            </button>
          </div>
        </div>

        <div className="px-4 pb-4">
          <Button variant="primary" className="w-full h-[50px] rounded-lg text-base font-semibold" onClick={() => setMobileSheetOpen(true)}>
            <Search className="h-5 w-5" />
            Search
          </Button>
        </div>
      </div>

      <HeroSearchSheet open={mobileSheetOpen} onClose={() => setMobileSheetOpen(false)} />
    </div>
  );
}
