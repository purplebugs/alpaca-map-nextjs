import SearchAlpacaFarmArea from "@/components/searchAlpacaFarmArea.js";
import { Suspense } from "react";
import Results from "@/app/search/results.js";

export default async function Page({ searchParams }) {
  const query = searchParams?.query || "";
  return (
    <>
      <header>
        <h2>Search</h2>
      </header>
      <main>
        <div className="search-form">
          <SearchAlpacaFarmArea placeholder="Search for alpaca, farm, or area" />
        </div>
        <div className="search-results">
          <Suspense fallback={<p>Loading results...</p>}>
            <Results query={query} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
