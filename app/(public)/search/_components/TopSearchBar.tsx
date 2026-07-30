"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, Plus, Globe, User, Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
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
    <header className="h-[88px] bg-white dark:bg-dark-card border-b border-neutral-200 dark:border-neutral-300 shadow-[0_4px_10px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_10px_rgba(0,0,0,0.3)] flex items-center px-4 md:px-8">
      <div className="grid grid-cols-[auto_1fr_auto] items-center w-full max-w-[1440px] mx-auto gap-4">
        <Link href="/" className="flex items-center flex-shrink-0">
          <Image src="/images/logo 2.svg" alt="Venuze" width={110} height={20} className="h-5 w-auto" />
        </Link>

        <div className="hidden md:flex justify-center">
          <div className="flex items-center bg-white dark:bg-dark-bg rounded-xl shadow-md max-w-[430px] w-full">
            <div className="flex-1 min-w-0">
              <LocationField
                value={filters.location}
                onChange={(v) => setFilters({ location: v })}
                variant="compact"
              />
            </div>
            <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-300" />
            <div className="flex-1 min-w-0">
              <DateField
                value={filters.dateRange}
                onChange={(v) => setFilters({ dateRange: v })}
                variant="compact"
              />
            </div>
            <div className="w-px h-8 bg-neutral-200 dark:bg-neutral-300" />
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

        <div className="flex items-center gap-2 md:gap-3 justify-self-end">
          <Button
            variant="white"
            size="pill"
            className="hidden md:inline-flex h-10 px-1 rounded-lg lg:px-5 shadow-md text-xs lg:text-sm"
          >
            <span className="hidden lg:inline">Add your listing</span>
            <span className="lg:hidden">Listing</span>
            <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
          </Button>

          <div className="hidden md:flex items-center gap-2">
            <div className="h-10 px-3 lg:px-4 bg-white dark:bg-dark-card rounded-[10px] flex items-center gap-2 shadow-md cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-300 transition-colors">
              <span className="text-xs lg:text-sm font-medium text-primary">EN</span>
              <ChevronDown className="h-3 w-3 lg:h-4 lg:w-4" />
            </div>
          </div>

          <div className="h-9 w-9 md:h-10 md:w-10 lg:h-[44px] lg:w-[44px] bg-white dark:bg-dark-card rounded-[10px] flex items-center justify-center shadow-md cursor-pointer hover:bg-gray-50 dark:hover:bg-neutral-300 transition-colors">
            <User className="h-4 w-4 md:h-5 md:w-5 text-primary" />
          </div>

          <button
            className="md:hidden h-9 w-9 bg-white dark:bg-dark-card rounded-[5px] flex items-center justify-center shadow-md"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5 text-muted-dark" />
          </button>
        </div>
      </div>
    </header>
  );
}
