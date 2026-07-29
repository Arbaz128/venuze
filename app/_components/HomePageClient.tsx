"use client";

import { useSearchViewStore } from "@/store/searchViewStore";
import { HeroSearchView } from "./HeroSearchView";
import { SearchResultsView } from "./SearchResultsView";

export function HomePageClient() {
  const view = useSearchViewStore((s) => s.view);

  return (
    <main className="transition-opacity duration-300">
      {view === "landing" ? <HeroSearchView /> : <SearchResultsView />}
    </main>
  );
}
