"use client";

import { useRef } from "react";
import {
  LayoutGrid,
  Camera,
  Film,
  Warehouse,
  Image,
  UtensilsCrossed,
  Building2,
  Building,
  Landmark,
  PartyPopper,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "all", label: "All Spaces", icon: LayoutGrid },
  { id: "photo-studio", label: "Photo Studio", icon: Camera },
  { id: "film-studio", label: "Film Studio", icon: Film },
  { id: "warehouse", label: "Warehouse", icon: Warehouse },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "restaurant", label: "Restaurant", icon: UtensilsCrossed },
  { id: "apartment", label: "Apartment", icon: Building },
  { id: "office-space", label: "Office Space", icon: Building2 },
  { id: "venue", label: "Venue", icon: Landmark },
  { id: "private-party", label: "Private Party", icon: PartyPopper },
  { id: "meeting", label: "Meeting", icon: Users },
];

interface CategoryTabsProps {
  active: string;
  onChange: (id: string) => void;
}

export function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
  };

  return (
    <div className="h-[80px] border-b border-neutral-350 dark:border-neutral-300 bg-white dark:bg-dark-bg flex items-center relative">
      <button
        onClick={() => scroll("left")}
        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-dark-card shadow-md border border-neutral-200 dark:border-neutral-300 ml-2"
        aria-label="Scroll categories left"
      >
        <ChevronLeft size={16} className="text-neutral-text-muted" />
      </button>

      <div
        ref={scrollRef}
        className="flex items-center gap-6 md:gap-8 overflow-x-auto scrollbar-hide px-4 md:px-12 w-full"
        role="tablist"
        aria-label="Venue categories"
      >
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = active === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat.id)}
              role="tab"
              aria-selected={isActive}
              className={cn(
                "flex flex-col items-center gap-1.5 pb-3 pt-2 min-w-[72px] transition-colors relative",
                isActive ? "text-brand" : "text-[#616161] dark:text-neutral-text-muted"
              )}
            >
              <Icon size={24} strokeWidth={isActive ? 2 : 1.5} />
              <span
                className={cn(
                  "text-[12px] whitespace-nowrap leading-none",
                  isActive ? "font-[600]" : "font-[400] text-[#828282] dark:text-neutral-text-muted"
                )}
              >
                {cat.label}
              </span>
              {isActive && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[73px] h-[5px] bg-brand rounded-t" />
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => scroll("right")}
        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 items-center justify-center rounded-full bg-white dark:bg-dark-card shadow-md border border-neutral-200 dark:border-neutral-300 mr-2"
        aria-label="Scroll categories right"
      >
        <ChevronRight size={16} className="text-neutral-text-muted" />
      </button>
    </div>
  );
}
