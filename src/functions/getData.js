import "server-only";
import { cache } from "react";
import { Client } from "@elastic/elasticsearch";
import AnimalFetcher from "@/functions/animalFetcher.js";

export const getData = cache(async (id) => {
  const elastic = new Client({
    cloud: {
      id: process?.env?.ELASTIC_CLOUD_ID,
    },
    auth: {
      apiKey: process?.env?.ELASTIC_API_KEY,
    },
  });

  const fetcher = new AnimalFetcher(elastic, id);
  return await fetcher.fetch();
});
