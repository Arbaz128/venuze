"use client";

import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "@/store/filterStore";
import { getListings } from "@/services/listings";

export function useListingsQuery() {
  const filters = useFilterStore((s) => s.filters);

  return useQuery({
    queryKey: ["listings", filters],
    queryFn: () => getListings(filters),
    staleTime: 30_000,
    placeholderData: (prev) => prev,
  });
}
