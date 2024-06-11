import Link from "next/link";
import db from "@/functions/db.js";

const RenderedItem = (item) => {
  // To handle results with highlight markup that represents matches from Elasticsearch
  const markup = { __html: item };

  // We know this data is clean as it does not come from the the general public
  return <span dangerouslySetInnerHTML={markup} />;
};

export default async function Results({ query }) {
  const [animals, companies, locations] = await Promise.all([db?.getAnimals(query), db?.getCompanies(query)]);

  // TODO get areas, add to summary and list
  // TODO tests

  return (
    <>
      <p data-testid="search-list-results-heading">
        {/*         Areas TODO DO*/} - Farms{" "}
        {companies?.total > 0 ? <Link href="#companies-list">{companies?.total}</Link> : 0} - 🦙 Alpacas{" "}
        {animals?.total > 0 ? <Link href="#animals-list">{animals?.total}</Link> : 0}
      </p>

      <h4 id="companies-list">🦙 Farms - {companies?.total}</h4>
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
      <ul data-testid="list-results-animals">
        {animals?.items?.map((item) => (
          <li key={item?.alpacaId}>
            {RenderedItem(item?.alpacaRegisteredName)}

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
