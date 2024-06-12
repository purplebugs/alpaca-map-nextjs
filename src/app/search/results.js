import { Pagination } from "@/components/pagination";
import Link from "next/link";
import db from "@/functions/db.js";

const RenderedItem = (item) => {
  // To handle results with highlight markup that represents matches from Elasticsearch
  const markup = { __html: item };

  // We know this data is clean as it does not come from the the general public
  return <span dangerouslySetInnerHTML={markup} />;
};

export default async function Results({ query, alpacaPageNumber, farmPageNumber, locationPageNumber }) {
  const itemsPerSection = 5;

  // TODO keep value of all current page numbers regardless of which page number links are clicked

  const fromAlpaca = (alpacaPageNumber - 1) * itemsPerSection;
  const fromFarm = (farmPageNumber - 1) * itemsPerSection;
  const fromLocation = (locationPageNumber - 1) * itemsPerSection;

  const [animals, companies, locations] = await Promise.all([
    db?.getAnimals(query, fromAlpaca, itemsPerSection),
    db?.getCompanies(query, fromFarm, itemsPerSection),
    db?.getLocations(query, fromLocation, itemsPerSection),
  ]);

  const alpacaTotalPages = Math.ceil(animals?.total / itemsPerSection);
  const alpacaPageList = Array.from({ length: alpacaTotalPages }, (_, i) => i + 1);

  const farmTotalPages = Math.ceil(companies?.total / itemsPerSection);
  const farmPageList = Array.from({ length: farmTotalPages }, (_, i) => i + 1);

  const locationTotalPages = Math.ceil(locations?.total / itemsPerSection);
  const locationPageList = Array.from({ length: locationTotalPages }, (_, i) => i + 1);

  return (
    <>
      <p data-testid="search-list-results-heading">
        Areas {locations?.total > 0 ? <Link href="#locations-list">{locations?.total}</Link> : 0} - Farms{" "}
        {companies?.total > 0 ? <Link href="#companies-list">{companies?.total}</Link> : 0} - 🦙 Alpacas{" "}
        {animals?.total > 0 ? <Link href="#animals-list">{animals?.total}</Link> : 0}
      </p>

      <h4 id="locations-list">Areas - {locations?.total}</h4>

      <Pagination items={locationPageList} query={query} pageNumber={"locationPageNumber"} />

      <ul data-testid="list-results-locations">
        {locations?.items?.map((item) => (
          <>
            <li key={item?.id}>
              {RenderedItem(item?.name)} - {RenderedItem(item?.location?.google?.administrative_area_level_2)},{" "}
              {RenderedItem(item?.location?.google?.administrative_area_level_1)}
            </li>
            <ul>
              <li>
                <Link href={`/farm/${item?.id}`} data-testid={`list-results-locations-farm-id-${item?.id}`}>
                  Farm info
                </Link>
              </li>
            </ul>
          </>
        ))}
      </ul>

      <h4 id="companies-list">Farms - {companies?.total}</h4>

      <Pagination items={farmPageList} query={query} pageNumber={"farmPageNumber"} />

      <ul data-testid="list-results-companies">
        {companies?.items?.map((item) => (
          <li key={item.id}>
            {RenderedItem(item.name)}
            <ul>
              <li>
                <Link href={`/farm/${item.id}`} data-testid={`list-results-companies-farm-id-${item.id}`}>
                  Alpaca info
                </Link>
              </li>
            </ul>
          </li>
        ))}
      </ul>

      <h4 id="animals-list">🦙 Alpacas - {animals?.total}</h4>

      <Pagination items={alpacaPageList} query={query} pageNumber={"alpacaPageNumber"} />

      <ul data-testid="list-results-animals">
        {animals?.items?.map((item) => (
          <li key={item?.alpacaId}>
            Short Name: {RenderedItem(item?.alpacaRegisteredName)}
            <ul>
              <li>Registered Name: {RenderedItem(item?.alpacaRegisteredName)}</li>
              <li>
                <Link
                  href={`/alpaca/${item?.alpacaId}`}
                  data-testid={`list-results-animals-animal-id-${item?.alpacaId}`}>
                  Alpaca info
                </Link>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
