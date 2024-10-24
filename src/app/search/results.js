import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMap } from "@fortawesome/free-solid-svg-icons";

import { Pagination } from "@/components/pagination";
import Link from "next/link";
import db from "@/functions/db.js";

const RenderedItem = (item) => {
  // To handle results with highlight markup that represents matches from Elasticsearch
  const markup = { __html: item };

  // We know this data is clean as it does not come from the the general public
  return <span dangerouslySetInnerHTML={markup} />;
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
        className="flex flex-wrap justify-center"
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
          href="#companies-list"
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
        <>
          <h4 id="locations-list">Areas - {locations?.total}</h4>

          <Pagination
            items={locationPageList}
            searchParams={searchParams}
            section={"locationPageNumber"}
          />

          <ul data-testid="list-results-locations">
            {locations?.items?.map((item) => (
              <li key={item?.id}>
                <Link
                  href={`/farm/${item?.id}`}
                  data-testid={`list-results-locations-farm-id-${item?.id}`}
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
              </li>
            ))}
          </ul>
        </>
      )}

      {companies?.total > 0 && (
        <>
          <h4 id="companies-list">Farms - {companies?.total}</h4>

          <Pagination
            items={farmPageList}
            searchParams={searchParams}
            section={"farmPageNumber"}
          />

          <ul data-testid="list-results-companies">
            {companies?.items?.map((item) => (
              <li key={item?.id}>
                <Link
                  href={`/farm/${item.id}`}
                  data-testid={`list-results-companies-farm-id-${item.id}`}
                >
                  {RenderedItem(item.name)}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      {animals?.total > 0 && (
        <>
          <h4 id="animals-list">🦙 Alpacas - {animals?.total}</h4>

          <Pagination
            items={alpacaPageList}
            searchParams={searchParams}
            section={"alpacaPageNumber"}
          />

          <ul data-testid="list-results-animals">
            {animals?.items?.map((item) => (
              <li key={item?.alpacaId}>
                <p>
                  Short Name:{" "}
                  <Link
                    href={`/alpaca/${item?.alpacaId}`}
                    data-testid={`list-results-animals-animal-id-${item?.alpacaId}-short-name`}
                  >
                    {RenderedItem(item?.alpacaRegisteredName)}
                  </Link>
                </p>
                <p>
                  Registered Name:{" "}
                  <Link
                    href={`/alpaca/${item?.alpacaId}`}
                    data-testid={`list-results-animals-animal-id-${item?.alpacaId}-registered-name`}
                  >
                    {RenderedItem(item?.alpacaRegisteredName)}
                  </Link>
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
