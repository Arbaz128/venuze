"use client";

import { useFilterStore } from "@/store/filterStore";

export function EmptyState() {
  const resetFilters = useFilterStore((s) => s.resetFilters);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <svg
        width="180"
        height="140"
        viewBox="0 0 180 140"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-6"
      >
        <rect x="20" y="30" width="100" height="80" rx="8" fill="#F4F4F4" stroke="#EAEAEA" strokeWidth="2" />
        <rect x="30" y="40" width="40" height="30" rx="4" fill="#EAEAEA" />
        <rect x="30" y="78" width="60" height="6" rx="3" fill="#EAEAEA" />
        <rect x="30" y="90" width="40" height="6" rx="3" fill="#EAEAEA" />
        <circle cx="140" cy="90" r="28" fill="#F4F4F4" />
        <circle cx="140" cy="90" r="20" fill="#EAEAEA" />
        <circle cx="140" cy="90" r="12" fill="#FF5039" opacity="0.3" />
        <circle cx="148" cy="82" r="18" fill="#F4F4F4" stroke="#8A8A8A" strokeWidth="1.5" />
        <line x1="153" y1="87" x2="162" y2="96" stroke="#8A8A8A" strokeWidth="2" strokeLinecap="round" />
        <path d="M138 90 L142 94 L150 86" stroke="#8A8A8A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="23" y="27" width="94" height="10" rx="2" fill="#FF5039" opacity="0.15" />
      </svg>

      <h3 className="text-[15px] font-[500] text-black text-center mb-2">
        No data found for your search.
      </h3>
      <p className="text-[13px] font-[400] text-neutral-text-muted text-center max-w-[250px] mb-6">
        Explore other options or clear filters to see more results.
      </p>
      <button
        onClick={resetFilters}
        className="bg-brand text-white rounded-[10px] px-6 py-2.5 text-[13px] font-[500] hover:opacity-90 transition-opacity"
      >
        Clear Filters
      </button>
    </div>
  );
}
