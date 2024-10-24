import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMap } from "@fortawesome/free-solid-svg-icons";

import { Pagination } from "@/components/pagination";
import Link from "next/link";
import db from "@/functions/db.js";

const RenderedItem = (item) => {
  // To handle results with highlight markup that represents matches from Elasticsearch
  const markup = { __html: item };

  // We know this data is clean as it does not come from the the general public
  return <span className="highlight" dangerouslySetInnerHTML={markup} />;
};

export default async function Results({
  searchParams,
  alpacaPageNumber,
  farmPageNumber,
  locationPageNumber,
}) {
  const itemsPerSection = 5;

  const fromAlpaca = (alpacaPageNumber - 1) * itemsPerSection;
  const fromFarm = (farmPageNumber - 1) * itemsPerSection;
  const fromLocation = (locationPageNumber - 1) * itemsPerSection;

  const [animals, companies, locations] = await Promise.all([
    db?.getAnimals(searchParams?.query, fromAlpaca, itemsPerSection),
    db?.getCompanies(searchParams?.query, fromFarm, itemsPerSection),
    db?.getLocations(searchParams?.query, fromLocation, itemsPerSection),
  ]);

  const alpacaTotalPages = Math.ceil(animals?.total / itemsPerSection);
  const alpacaPageList = Array.from(
    { length: alpacaTotalPages },
    (_, i) => i + 1
  );

  const farmTotalPages = Math.ceil(companies?.total / itemsPerSection);
  const farmPageList = Array.from({ length: farmTotalPages }, (_, i) => i + 1);

  const locationTotalPages = Math.ceil(locations?.total / itemsPerSection);
  const locationPageList = Array.from(
    { length: locationTotalPages },
    (_, i) => i + 1
  );

  return (
    <>
      <div
        data-testid="search-list-results-heading"
        className="flex flex-wrap justify-center py-2"
      >
        <Link
          href="#locations-list"
          className="hover:bg-brown-400 hover:underline hover:decoration-8
          p-1 m-0.5 sm:p-3 sm:m-3 bg-brown-200 rounded-xl shadow-lg 
          grow shrink-0 basis-20 md:basis-40 
          flex items-center flex-col justify-between sm:flex-row sm:justify-normal gap-x-4"
        >
          <div className="text-center text-2xl">
            {locations?.total > 0 ? locations?.total : 0}
          </div>
          <div className="text-center">
            <FontAwesomeIcon icon={faMap} className="fa-lg" />
          </div>
          <div className="text-center">Areas</div>
        </Link>

        <Link
          href="#companies-list"
          className="hover:bg-brown-400 hover:underline hover:decoration-8
          p-1 m-0.5 sm:p-3 sm:m-3 bg-brown-200 rounded-xl shadow-lg 
          grow shrink-0 basis-20 md:basis-40 
          flex items-center flex-col justify-between sm:flex-row sm:justify-normal gap-x-4"
        >
          <div className="text-center text-2xl">
            {companies?.total > 0 ? companies?.total : 0}
          </div>
          <div className="text-center">
            <FontAwesomeIcon icon={faHouse} className="fa-lg" />
          </div>
          <div className="text-center">Farms</div>
        </Link>

        <Link
          href="#animals-list"
          className="hover:bg-brown-400 hover:underline hover:decoration-8
          p-1 m-0.5 sm:p-3 sm:m-3 bg-brown-200 rounded-xl shadow-lg 
          grow shrink-0 basis-20 md:basis-40 
          flex items-center flex-col justify-between sm:flex-row sm:justify-normal gap-x-4"
        >
          <div className="text-center text-2xl">
            {animals?.total > 0 ? animals?.total : 0}
          </div>
          <div className="text-center text-2xl">🦙</div>
          <div className="text-center">Alpacas</div>
        </Link>
      </div>

      {locations?.total > 0 && (
        <div id="locations-list" className="my-6 space-y-4">
          <h3 className="text-2xl font-bold leading-loose tracking-tight">
            <FontAwesomeIcon icon={faMap} className="fa-lg" /> Areas -{" "}
            {locations?.total}
          </h3>

          <ul data-testid="list-results-locations" className="space-y-4">
            {locations?.items?.map((item) => (
              <li key={item?.id} className="flex items-center">
                <svg
                  className="h-6 w-6 flex-none fill-brown-100 stroke-brown-500 stroke-2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="11" />
                  <path
                    d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                    fill="none"
                  />
                </svg>

                <div className="ml-4">
                  <Link
                    href={`/farm/${item?.id}`}
                    data-testid={`list-results-locations-farm-id-${item?.id}`}
                    className="hover:underline hover:decoration-8"
                  >
                    {RenderedItem(item?.name)}
                  </Link>{" "}
                  -{" "}
                  {RenderedItem(
                    item?.location?.google?.administrative_area_level_2
                  )}
                  ,{" "}
                  {RenderedItem(
                    item?.location?.google?.administrative_area_level_1
                  )}
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            items={locationPageList}
            searchParams={searchParams}
            section={"locationPageNumber"}
          />
        </div>
      )}

      {companies?.total > 0 && (
        <div id="companies-list" className="my-6 space-y-4">
          <h3 className="text-2xl font-bold leading-loose tracking-tight">
            <FontAwesomeIcon icon={faHouse} className="fa-lg" /> Farms -{" "}
            {companies?.total}
          </h3>

          <ul data-testid="list-results-companies" className="space-y-4">
            {companies?.items?.map((item) => (
              <li key={item?.id} className="flex items-center">
                <svg
                  className="h-6 w-6 flex-none fill-brown-100 stroke-brown-500 stroke-2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="11" />
                  <path
                    d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                    fill="none"
                  />
                </svg>

                <div className="ml-4">
                  <Link
                    href={`/farm/${item.id}`}
                    data-testid={`list-results-companies-farm-id-${item.id}`}
                    className="hover:underline hover:decoration-8"
                  >
                    {RenderedItem(item.name)}
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            items={farmPageList}
            searchParams={searchParams}
            section={"farmPageNumber"}
          />
        </div>
      )}

      {animals?.total > 0 && (
        <div id="animals-list" className="my-6 space-y-4">
          <h3 className="text-2xl font-bold leading-loose tracking-tight">
            🦙 Alpacas - {animals?.total}
          </h3>

          <ul data-testid="list-results-animals" className="space-y-4">
            {animals?.items?.map((item) => (
              <li key={item?.alpacaId} className="flex items-center">
                <svg
                  className="h-6 w-6 flex-none fill-brown-100 stroke-brown-500 stroke-2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="11" />
                  <path
                    d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                    fill="none"
                  />
                </svg>

                <div className="ml-4">
                  Short Name:{" "}
                  <Link
                    href={`/alpaca/${item?.alpacaId}`}
                    data-testid={`list-results-animals-animal-id-${item?.alpacaId}-short-name`}
                    className="hover:underline hover:decoration-8"
                  >
                    {RenderedItem(item?.alpacaShortName)}
                  </Link>
                  <ul>
                    <li>
                      Registered Name:{" "}
                      <Link
                        href={`/alpaca/${item?.alpacaId}`}
                        data-testid={`list-results-animals-animal-id-${item?.alpacaId}-registered-name`}
                        className="hover:underline hover:decoration-8"
                      >
                        {RenderedItem(item?.alpacaRegisteredName)}
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            ))}
          </ul>

          <Pagination
            items={alpacaPageList}
            searchParams={searchParams}
            section={"alpacaPageNumber"}
          />
        </div>
      )}
    </>
  );
}
