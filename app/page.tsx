"use client";

import { useSearchViewStore } from "@/store/searchViewStore";
import { HeroSearchView } from "./_components/HeroSearchView";
import { SearchResultsView } from "./_components/SearchResultsView";

export default function HomePage() {
  const view = useSearchViewStore((s) => s.view);

  return (
    <div className="transition-opacity duration-300">
      {view === "landing" ? <HeroSearchView /> : <SearchResultsView />}
    </div>
  );
}
