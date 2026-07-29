import { create } from "zustand";

interface HeroSearchState {
  location: string;
  dateRange: string;
  guests: string;
  setLocation: (location: string) => void;
  setDateRange: (dateRange: string) => void;
  setGuests: (guests: string) => void;
}

export const useHeroSearchStore = create<HeroSearchState>((set) => ({
  location: "",
  dateRange: "",
  guests: "",
  setLocation: (location) => set({ location }),
  setDateRange: (dateRange) => set({ dateRange }),
  setGuests: (guests) => set({ guests }),
}));
