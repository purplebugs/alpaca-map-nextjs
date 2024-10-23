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
        <div
          data-testid="search-list-results-heading-areas"
          className="p-1 md:p-3 m-0.5 md:m-3 bg-brown-200 rounded-xl shadow-lg grow shrink basis-20 md:basis-40"
        >
          {locations?.total > 0 ? (
            <Link href="#locations-list">{locations?.total}</Link>
          ) : (
            0
          )}{" "}
          Areas
        </div>

        <div
          data-testid="search-list-results-heading-areas"
          className="p-1 md:p-3 m-0.5 md:m-3 bg-brown-200 rounded-xl shadow-lg grow shrink basis-20 md:basis-40"
        >
          {companies?.total > 0 ? (
            <Link href="#companies-list">{companies?.total}</Link>
          ) : (
            0
          )}{" "}
          Farms
        </div>
        <div
          data-testid="search-list-results-heading-areas"
          className="p-1 md:p-3 m-0.5 md:m-3 bg-brown-200 rounded-xl shadow-lg grow shrink basis-20 md:basis-40"
        >
          🦙
          {animals?.total > 0 ? (
            <Link href="#animals-list">{animals?.total}</Link>
          ) : (
            0
          )}{" "}
          Alpacas
        </div>
      </div>

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
            {RenderedItem(item?.location?.google?.administrative_area_level_2)},{" "}
            {RenderedItem(item?.location?.google?.administrative_area_level_1)}
          </li>
        ))}
      </ul>

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
  );
}
