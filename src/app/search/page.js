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
      <main id="search-page">
        <div className="search-form">
          <div id="form-search-by-alpaca">
            <SearchAlpacaFarmArea placeholder="Find alpaca, farm, area" />
          </div>
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
