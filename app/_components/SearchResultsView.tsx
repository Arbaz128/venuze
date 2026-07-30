"use client";

import { useFilterStore } from "@/store/filterStore";
import { useListingsQuery } from "@/hooks/useListingsQuery";
import { TopSearchBar } from "@/app/(public)/search/_components/TopSearchBar";
import { CategoryTabs } from "@/app/(public)/search/_components/CategoryTabs";
import { ToolbarSecondary } from "@/app/(public)/search/_components/ToolbarSecondary";
import { ResultsHeader } from "@/app/(public)/search/_components/ResultsHeader";
import { ListingGrid } from "@/app/(public)/search/_components/ListingGrid";
import { MapPanel } from "@/app/(public)/search/_components/MapPanel";
import { FilterModal } from "@/app/(public)/search/_components/FilterModal";

const STICKY_OFFSET = 218;

export function SearchResultsView() {
  const filters = useFilterStore((s) => s.filters);
  const setFilters = useFilterStore((s) => s.setFilters);
  const isMapView = useFilterStore((s) => s.isMapView);
  const toggleMapView = useFilterStore((s) => s.toggleMapView);

  const { data } = useListingsQuery();
  const total = data?.total ?? 0;
  const listings = data?.items ?? [];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg flex flex-col">
      
      <TopSearchBar />
      <ToolbarSecondary />
      <CategoryTabs
        active={filters.category}
        onChange={(category) => setFilters({ category })}
      />
      <ResultsHeader total={total} />

      <div className="flex-1 flex">
        <div className={`flex-1 ${isMapView ? "hidden xl:block" : ""}`}>
          <ListingGrid />  
        </div>

        {isMapView && (
          <div
            className="fixed inset-0 z-40 xl:relative xl:z-auto xl:sticky xl:flex-shrink-0 xl:w-[421px]"
            style={{ top: STICKY_OFFSET, height: `calc(100vh - ${STICKY_OFFSET}px)` }}
          >
            <div className="xl:hidden absolute top-4 left-4 z-10">
              <button
                onClick={toggleMapView}
                className="bg-white dark:bg-dark-card rounded-full px-4 py-2 shadow-md text-[13px] font-[500] flex items-center gap-2"
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
          <div
            className="hidden xl:block xl:sticky xl:flex-shrink-0 xl:w-[421px] xl:border-l xl:border-neutral-200 dark:xl:border-neutral-300"
            style={{ top: STICKY_OFFSET, height: `calc(100vh - ${STICKY_OFFSET}px)` }}
          >
            <MapPanel listings={listings} />
          </div>
        )}
      </div>

      <FilterModal />
    </div>
  );
}
