"use client";

import { useState, useEffect, useRef } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useFilterStore } from "@/store/filterStore";

export function ToolbarSecondary() {
  const storeKeyword = useFilterStore((s) => s.filters.keyword);
  const setFilters = useFilterStore((s) => s.setFilters);
  const openFilterModal = useFilterStore((s) => s.openFilterModal);
  const [localKeyword, setLocalKeyword] = useState(storeKeyword);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (localKeyword !== storeKeyword) {
        setFilters({ keyword: localKeyword });
      }
    }, 300);
    return () => { if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; } };
  }, [localKeyword, storeKeyword, setFilters]);

  return (
    <div className="h-[50px] border-b border-neutral-350 dark:border-neutral-300 bg-white dark:bg-dark-bg flex items-center px-4 md:px-8">
      <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto">
        <div className="flex items-center gap-3 flex-1 max-w-[500px]">
          <Search size={16} className="text-neutral-text-muted flex-shrink-0" />
          <input
            type="text"
            placeholder="Add keywords..."
            value={localKeyword}
            onChange={(e) => setLocalKeyword(e.target.value)}
            className="flex-1 border-none outline-none text-[13px] font-[400] placeholder:text-[#A39E9E] bg-transparent text-black dark:text-dark-text"
          />
        </div>

        <button
          onClick={openFilterModal}
          className="flex items-center gap-2 border-l border-neutral-300 dark:border-neutral-300 pl-4 py-1 text-[13px] font-[500] text-neutral-text-muted hover:text-black dark:hover:text-dark-text transition-colors"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>
    </div>
  );
}
