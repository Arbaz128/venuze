import { create } from "zustand";

export type SearchView = "landing" | "results";

interface SearchViewState {
  view: SearchView;
  showResults: () => void;
  showLanding: () => void;
}

export const useSearchViewStore = create<SearchViewState>((set) => ({
  view: "landing",
  showResults: () => set({ view: "results" }),
  showLanding: () => set({ view: "landing" }),
}));
