"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { MapPin, Search as SearchIcon, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const DESTINATIONS = [
  "London, UK",
  "New York, USA",
  "Dubai, UAE",
  "Paris, France",
  "Los Angeles, USA",
  "Sydney, Australia",
  "Tokyo, Japan",
  "Barcelona, Spain",
  "Amsterdam, Netherlands",
  "Berlin, Germany",
];

interface LocationFieldProps {
  value: string;
  onChange: (value: string) => void;
  variant?: "hero" | "compact";
}

export function LocationField({ value, onChange, variant = "hero" }: LocationFieldProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (open && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 6, left: r.left, width: Math.max(r.width, 280) });
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  const filtered = DESTINATIONS.filter((d) =>
    d.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-3 text-left w-full",
          variant === "hero" ? "px-4 py-3" : "px-4 py-2.5"
        )}
      >
        <MapPin className={cn("flex-shrink-0 text-[#767676]", variant === "hero" ? "h-5 w-5" : "h-4 w-4")} />
        <div className="flex-1 min-w-0">
          <span className={cn("block font-[600] text-[#767676]", variant === "hero" ? "text-[11px]" : "text-[10px]")}>Where</span>
          <span className={cn("block truncate", value ? "text-black dark:text-dark-text font-[500]" : "text-[#A0A0A0]", variant === "hero" ? "text-[14px]" : "text-[12px]")}>
            {value || "Search destinations"}
          </span>
        </div>
        {variant === "compact" && <ChevronDown size={14} className="text-[#767676] flex-shrink-0" />}
      </button>

      {open && createPortal(
        <div className="fixed inset-0 z-[100]" onClick={() => setOpen(false)}>
          <div
            className="absolute bg-white dark:bg-dark-card rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.18)] border border-neutral-200 dark:border-neutral-300 overflow-hidden"
            style={{ top: pos.top, left: pos.left, width: pos.width }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-300 px-4 py-3">
              <SearchIcon size={16} className="text-[#767676] flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search destinations"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 border-none outline-none text-[14px] bg-transparent text-black dark:text-dark-text placeholder:text-[#A0A0A0]"
              />
            </div>
            <div className="max-h-[240px] overflow-y-auto py-2">
              {filtered.map((dest) => (
                <button
                  key={dest}
                  type="button"
                  onClick={() => { onChange(dest); setOpen(false); setQuery(""); }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-left text-[14px] transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-300",
                    value === dest ? "text-brand font-[500]" : "text-black dark:text-dark-text"
                  )}
                >
                  <MapPin size={16} className="text-[#BDBDBD] flex-shrink-0" />
                  {dest}
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-4 py-3 text-[13px] text-[#A0A0A0]" role="status" aria-live="polite">No destinations found</p>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
