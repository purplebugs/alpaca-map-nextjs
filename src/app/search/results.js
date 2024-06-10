import db from "@/functions/db.js";

export default async function Results({ query }) {
  const animals = await db?.getAnimals(query);

  console.log(animals);
  // TODO show more animal details
  // TODO get farms, areas and show results
  // TODO interpret emphasis tags in results
  // TODO debouncing or similar for search

  // TODO tests

  return (
    <>
      <h4 id="animals-list">🦙 Alpacas - TODO total</h4>
      <ul data-testid="list-results-animals">
        {animals?.map((item) => (
          <li key={item?.alpacaId}>{item?.alpacaRegisteredName}</li>
        ))}
      </ul>
    </>
  );
}
