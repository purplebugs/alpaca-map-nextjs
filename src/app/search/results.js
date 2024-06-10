import Link from "next/link";
import db from "@/functions/db.js";

const RenderedItem = (item) => {
  // To handle results with highlight markup that represents matches from Elasticsearch
  const markup = { __html: item };

  // We know this data is clean as it does not come from the the general public
  return <span dangerouslySetInnerHTML={markup} />;
};

export default async function Results({ query }) {
  const animals = await db?.getAnimals(query);

  console.log(animals);

  // TODO get farms, areas and show results
  // TODO debouncing or similar for search
  // TODO tests

  return (
    <>
      <h4 id="animals-list">🦙 Alpacas - TODO total</h4>
      <ul data-testid="list-results-animals">
        {animals?.map((item) => (
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
