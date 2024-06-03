import "server-only";
// import { cache } from "react";
import Mock from "@/functions/database.mock.js";
import Elastic from "@/functions/database.elastic.js";

/* export const getAnimal = cache(async (id) => {
  const db = connectToDatabase();

  const fetcher = new AnimalFetcher(db, id);
  return await fetcher.fetch();
}); */

let database = null;

export const getDatabase = () => {
  if (!database) {
    database =
      process?.env?.NODE_ENV === "test"
        ? new Mock()
        : new Elastic(process.env.ELASTIC_CLOUD_ID, process.env.ELASTIC_API_KEY);
    // database = new Mock();
  }

  return database;
};
