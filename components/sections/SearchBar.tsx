"use client";

import { useState } from "react";
import { Search, MapPin, Calendar, Users, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/utils";

type SearchTab = "venue" | "vendors";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const [activeTab, setActiveTab] = useState<SearchTab>("venue");

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="flex items-center gap-2 bg-white rounded-full p-1.5 shadow-md">
        <button
          onClick={() => setActiveTab("venue")}
          className={cn(
            "flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all",
            activeTab === "venue"
              ? "bg-primary text-white"
              : "bg-transparent text-muted-dark hover:text-primary"
          )}
        >
          <MapPin className="h-4 w-4" />
          Venue
        </button>
        <button
          onClick={() => setActiveTab("vendors")}
          className={cn(
            "flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all",
            activeTab === "vendors"
              ? "bg-primary text-white"
              : "bg-transparent text-muted-dark hover:text-primary"
          )}
        >
          <Users className="h-4 w-4" />
          Vendors
        </button>
      </div>

      {/* Desktop: full pill */}
      <div className="hidden lg:flex items-center bg-white rounded-full shadow-lg px-6 w-full max-w-[1054px] h-auto min-h-[80px] lg:min-h-[100px]">
        <div className="flex-1 flex items-center gap-6">
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <MapPin className="h-5 w-5 text-muted flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-xs font-semibold text-muted-dark">Where</label>
              <span className="block text-sm text-muted-dark">Search destinations</span>
            </div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <Calendar className="h-5 w-5 text-muted flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-xs font-semibold text-muted-dark">When</label>
              <span className="block text-sm text-muted-dark">Select date</span>
            </div>
          </div>
          <div className="w-px h-10 bg-border" />
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <Users className="h-5 w-5 text-muted flex-shrink-0" />
            <div className="flex-1">
              <label className="block text-xs font-semibold text-muted-dark">Guest</label>
              <span className="block text-sm text-muted-dark">Add guests</span>
            </div>
          </div>
        </div>
        <Button variant="primary" size="lg" className="h-[61px] px-8 ml-4 rounded-full text-lg flex-shrink-0">
          <Search className="h-5 w-5" />
          <span>Search</span>
        </Button>
      </div>

      {/* Tablet: single row, compact */}
      <div className="hidden md:flex lg:hidden items-center bg-white rounded-full shadow-lg px-5 w-full max-w-[680px] h-[70px]">
        <div className="flex-1 flex items-center gap-4">
          <div className="flex items-center gap-2 px-3">
            <MapPin className="h-4 w-4 text-muted flex-shrink-0" />
            <span className="text-sm text-muted-dark font-medium">Search destinations</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center gap-2 px-3">
            <Calendar className="h-4 w-4 text-muted flex-shrink-0" />
            <span className="text-sm text-muted-dark font-medium">Select date</span>
          </div>
          <div className="w-px h-8 bg-border" />
          <div className="flex items-center gap-2 px-3">
            <Users className="h-4 w-4 text-muted flex-shrink-0" />
            <span className="text-sm text-muted-dark font-medium">Add guests</span>
          </div>
        </div>
        <Button variant="primary" className="h-[50px] w-[50px] rounded-full p-0 ml-3 flex-shrink-0">
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
            <div className="flex items-center justify-between py-3 border-b border-[#E0E0E0]">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted" />
                <span className="text-sm text-muted-dark">Where</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted" />
            </div>
            <div className="flex items-center justify-between py-3 border-b border-[#E0E0E0]">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted" />
                <span className="text-sm text-muted-dark">When</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted" />
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <Users className="h-4 w-4 text-muted" />
                <span className="text-sm text-muted-dark">Guest</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted" />
            </div>
          </div>
        </div>

        <div className="px-4 pb-4">
          <Button variant="primary" className="w-full h-[50px] rounded-lg text-base font-semibold">
            <Search className="h-5 w-5" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
}
