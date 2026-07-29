"use client";

import { useFilterStore } from "@/store/filterStore";
import { useDebounce } from "@/hooks/useDebounce";
import { useListingsQuery } from "@/hooks/useListingsQuery";
import { TopSearchBar } from "./TopSearchBar";
import { CategoryTabs } from "./CategoryTabs";
import { ToolbarSecondary } from "./ToolbarSecondary";
import { ResultsHeader } from "./ResultsHeader";
import { ListingGrid } from "./ListingGrid";
import { MapPanel } from "./MapPanel";
import { FilterModal } from "./FilterModal";

export function SearchResultsView() {
  const filters = useFilterStore((s) => s.filters);
  const setFilters = useFilterStore((s) => s.setFilters);
  const isMapView = useFilterStore((s) => s.isMapView);
  const toggleMapView = useFilterStore((s) => s.toggleMapView);

  const debouncedKeyword = useDebounce(filters.keyword, 300);
  if (filters.keyword !== debouncedKeyword) {
    // keyword hasn't settled yet — don't update store
  }

  const { data, isLoading } = useListingsQuery();
  const total = data?.total ?? 0;
  const listings = data?.items ?? [];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <TopSearchBar />
      <CategoryTabs
        active={filters.category}
        onChange={(category) => setFilters({ category })}
      />
      <ToolbarSecondary />
      <ResultsHeader total={total} />

      <div className="flex-1 flex">
        <div className={`flex-1 ${isMapView ? "hidden xl:block" : ""}`}>
          <ListingGrid />
        </div>

        {isMapView && (
          <div className="fixed inset-0 z-40 xl:relative xl:z-auto xl:sticky xl:top-[218px] xl:w-[421px] xl:h-[calc(100vh-218px)] xl:flex-shrink-0">
            <div className="xl:hidden absolute top-4 left-4 z-10">
              <button
                onClick={toggleMapView}
                className="bg-white rounded-full px-4 py-2 shadow-md text-[13px] font-[500] flex items-center gap-2"
                aria-label="Show list"
              >
                <span className="text-lg leading-none">&larr;</span>
                Show list
              </button>
            </div>
            <MapPanel listings={listings} onClose={toggleMapView} />
          </div>
        )}

        {!isMapView && (
          <div className="hidden xl:block xl:sticky xl:top-[218px] xl:w-[421px] xl:h-[calc(100vh-218px)] xl:flex-shrink-0 xl:border-l xl:border-neutral-200">
            <MapPanel listings={listings} />
          </div>
        )}
      </div>

      <FilterModal />
    </div>
  );
}
