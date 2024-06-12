import SearchAlpacaFarmArea from "@/components/searchAlpacaFarmArea.js";
import { Suspense } from "react";
import Results from "@/app/search/results.js";

export default async function Page({ searchParams }) {
  const query = searchParams?.query || "";
  const alpacasPageNumber = searchParams?.alpacasPageNumber || 1;

  return (
    <>
      <header>
        <h2>Search</h2>
      </header>
      <main id="search-page">
        <div className="search-form">
          <div id="form-search-by-alpaca">
            <SearchAlpacaFarmArea placeholder="Find alpaca, farm, area" />
          </div>
        </div>
        <div className="search-results">
          <Suspense fallback={<p>Loading results...</p>}>
            <Results query={query} alpacasPageNumber={alpacasPageNumber} />
          </Suspense>
        </div>
      </main>
    </>
  );
}
