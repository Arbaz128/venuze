"use client";

import { useListingsQuery } from "@/hooks/useListingsQuery";
import { useFilterStore } from "@/store/filterStore";
import { ListingCard, ListingCardSkeleton } from "./ListingCard";
import { EmptyState } from "./EmptyState";

export function ListingGrid() {
  const { data, isLoading, isError } = useListingsQuery();
  const isMapView = useFilterStore((s) => s.isMapView);

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-neutral-text-muted">
        <p className="text-[15px] font-[500]">Something went wrong</p>
        <p className="text-[13px] mt-2">Please try again later.</p>
      </div>
    );
  }

  if (isLoading && !data) {
    return (
      <div
        className={`grid gap-6 md:gap-8 px-4 md:px-8 py-6 ${
          isMapView ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
        }`}
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <ListingCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!data || data.items.length === 0) {
    return <EmptyState />;
  }

  return (
    <div
      className={`grid gap-6 md:gap-8 px-4 md:px-8 py-6 ${
        isMapView ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
      }`}
    >
      {data.items.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
}
