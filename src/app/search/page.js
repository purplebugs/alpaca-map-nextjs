import SearchAlpacaFarmArea from "@/components/searchAlpacaFarmArea.js";
import { Suspense } from "react";
import Results from "@/app/search/results.js";

export default async function Page({ searchParams }) {
  const alpacaPageNumber = searchParams?.alpacaPageNumber || 1;
  const farmPageNumber = searchParams?.farmPageNumber || 1;
  const locationPageNumber = searchParams?.locationPageNumber || 1;

  return (
    <>
      <header>
        <h2>Search</h2>
      </header>
      <main id="search-page">
        <div>
          <div id="form-search-by-alpaca">
            <SearchAlpacaFarmArea placeholder="Find alpaca, farm, area" />
          </div>
        </div>
        <div>
          <Suspense fallback={<p>Loading results...</p>}>
            <Results
              searchParams={searchParams}
              alpacaPageNumber={alpacaPageNumber}
              farmPageNumber={farmPageNumber}
              locationPageNumber={locationPageNumber}
            />
          </Suspense>
        </div>
      </main>
    </>
  );
}
