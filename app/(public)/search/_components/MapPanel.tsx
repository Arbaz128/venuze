"use client";

import { Maximize2, X } from "lucide-react";
import type { Listing } from "@/types/listing";

interface MapPanelProps {
  listings: Listing[];
  onClose?: () => void;
}

export function MapPanel({ listings, onClose }: MapPanelProps) {
  return (
    <div className="relative w-full h-full bg-neutral-200 dark:bg-neutral-300 overflow-hidden rounded-lg">
      <div className="absolute inset-0 bg-[url('/images/sections/featured-venues-bg.png')] bg-cover bg-center opacity-30 dark:opacity-20" />

      {listings.map((listing) => {
        const pinX = ((listing.lng + 180) / 360) * 100;
        const pinY = ((90 - listing.lat) / 180) * 100;

        return (
          <div
            key={listing.id}
            className="absolute transition-transform hover:scale-110 z-10"
            style={{ left: `${pinX}%`, top: `${pinY}%`, transform: "translate(-50%, -100%)" }}
          >
            <div className="flex flex-col items-center">
              <div className="bg-white border-2 border-brand rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                <span className="text-brand font-[700] text-[11px]">V</span>
              </div>
              <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-brand" />
            </div>
          </div>
        );
      })}

      <div className="absolute top-3 right-3 flex gap-2">
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
          < Maximize2 size={14} />
        </button>
      </div>
    </div>
  );
}
