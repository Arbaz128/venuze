import { create } from "zustand";
import type { ListingFilters } from "@/types/listing";

const DEFAULT_FILTERS: ListingFilters = {
  keyword: "",
  category: "all",
  venueTypes: [],
  capacityRange: [10, 1500],
  priceRange: [10, 30000],
  occasions: [],
  verifiedOnly: false,
  sortBy: "recommended",
  location: "",
  dateRange: "",
  guests: "",
  page: 1,
};

interface FilterStore {
  filters: ListingFilters;
  isFilterModalOpen: boolean;
  isMapView: boolean;
  setFilters: (partial: Partial<ListingFilters>) => void;
  toggleVenueType: (type: string) => void;
  toggleOccasion: (occ: string) => void;
  resetFilters: () => void;
  openFilterModal: () => void;
  closeFilterModal: () => void;
  toggleMapView: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  filters: { ...DEFAULT_FILTERS },
  isFilterModalOpen: false,
  isMapView: false,

  setFilters: (partial) =>
    set((state) => ({
      filters: { ...state.filters, ...partial, page: 1 },
    })),

  toggleVenueType: (type) =>
    set((state) => {
      const exists = state.filters.venueTypes.includes(type);
      return {
        filters: {
          ...state.filters,
          venueTypes: exists
            ? state.filters.venueTypes.filter((t) => t !== type)
            : [...state.filters.venueTypes, type],
          page: 1,
        },
      };
    }),

  toggleOccasion: (occ) =>
    set((state) => {
      const exists = state.filters.occasions.includes(occ);
      return {
        filters: {
          ...state.filters,
          occasions: exists
            ? state.filters.occasions.filter((o) => o !== occ)
            : [...state.filters.occasions, occ],
          page: 1,
        },
      };
    }),

  resetFilters: () =>
    set({ filters: { ...DEFAULT_FILTERS } }),

  openFilterModal: () => set({ isFilterModalOpen: true }),
  closeFilterModal: () => set({ isFilterModalOpen: false }),
  toggleMapView: () => set((state) => ({ isMapView: !state.isMapView })),
}));
