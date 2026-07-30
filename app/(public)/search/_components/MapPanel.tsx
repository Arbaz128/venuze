"use client";

import Image from "next/image";
import { Maximize2, X } from "lucide-react";
import type { Listing } from "@/types/listing";

interface MapPanelProps {
  listings: Listing[];
  activeListingId: string | null;
  onListingSelect: (id: string | null) => void;
  onClose?: () => void;
}

export function MapPanel({ listings, activeListingId, onListingSelect, onClose }: MapPanelProps) {
  const activeListing = listings.find((l) => l.id === activeListingId) ?? null;

  const pinPos = activeListing
    ? {
        x: ((activeListing.lng + 180) / 360) * 100,
        y: ((90 - activeListing.lat) / 180) * 100,
      }
    : null;

  return (
    <div
      className="relative w-full h-full bg-neutral-200 dark:bg-neutral-300 overflow-hidden rounded-lg"
      onClick={() => onListingSelect(null)}
    >
      <div className="absolute inset-0 bg-[url('/images/map/map.svg')] bg-cover bg-center opacity-30 dark:opacity-20" />

      {listings.map((listing) => {
        const pinX = ((listing.lng + 180) / 360) * 100;
        const pinY = ((90 - listing.lat) / 180) * 100;
        const isActive = listing.id === activeListingId;

        return (
          <div
            key={listing.id}
            className={`absolute transition-all duration-300 z-10 cursor-pointer ${isActive ? "z-20 scale-110" : "hover:scale-110"}`}
            style={{ left: `${pinX}%`, top: `${pinY}%`, transform: "translate(-50%, -100%)" }}
            onClick={(e) => {
              e.stopPropagation();
              onListingSelect(isActive ? null : listing.id);
            }}
          >
            <div className="flex flex-col items-center">
              <div className={`border-2 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-colors ${isActive ? "bg-brand border-brand-dark" : "bg-white border-brand"}`}>
                <Image src="/logo/Venuze-Logo1 2.svg" alt="Pin" width={16} height={16} className={isActive ? "brightness-0 invert" : ""} />
              </div>
              <div className={`w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent transition-colors ${isActive ? "border-t-brand-dark" : "border-t-brand"}`} />
            </div>
          </div>
        );
      })}

      {activeListing && pinPos && (
        <div
          className="absolute z-30 bg-white dark:bg-dark-card rounded-xl shadow-lg overflow-hidden w-[200px]"
          style={{
            left: `${pinPos.x}%`,
            top: `calc(${pinPos.y}% - 12px)`,
            transform: "translate(-50%, -100%)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-[80px] bg-neutral-200 dark:bg-neutral-300">
            {activeListing.images[0] && (
              <Image
                src={activeListing.images[0]}
                alt={activeListing.title}
                fill
                className="object-cover"
                sizes="200px"
              />
            )}
          </div>
          <div className="p-3">
            <h4 className="font-[600] text-[13px] leading-[18px] text-black dark:text-dark-text line-clamp-1 mb-1">
              {activeListing.title}
            </h4>
            <p className="text-[11px] text-neutral-text-muted mb-2 truncate">
              {activeListing.city}, {activeListing.countryOrRegion}
            </p>
            <span className="text-[12px] font-[700] text-black dark:text-dark-text">
              ${activeListing.pricePerHour}/hr
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onListingSelect(null);
            }}
            className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/40 flex items-center justify-center hover:bg-black/60 transition-colors"
            aria-label="Close popup"
          >
            <X size={10} className="text-white" />
          </button>
        </div>
      )}

      <div className="absolute top-3 right-3 flex gap-2 z-20" onClick={(e) => e.stopPropagation()}>
        {onClose && (
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-full bg-white dark:bg-dark-card shadow-md flex items-center justify-center"
            aria-label="Close map"
          >
            <X size={14} />
          </button>
        )}
        <button
          className="h-8 w-8 rounded-full bg-white dark:bg-dark-card shadow-md flex items-center justify-center"
          aria-label="Expand map"
        >
          <Maximize2 size={14} />
        </button>
      </div>
    </div>
  );
}
