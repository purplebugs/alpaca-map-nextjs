import "server-only";
import { cache } from "react";
import { Client } from "@elastic/elasticsearch";
import AnimalFetcher from "@/functions/animalFetcher.js";
import AnimalsFetcher from "@/functions/animalsFetcher.js";

const connectToDatabase = () => {
  const elastic = new Client({
    cloud: {
      id: process?.env?.ELASTIC_CLOUD_ID,
    },
    auth: {
      apiKey: process?.env?.ELASTIC_API_KEY,
    },
  });

  return elastic;
};

export const getAnimal = cache(async (id) => {
  const elastic = connectToDatabase();

  const fetcher = new AnimalFetcher(elastic, id);
  return await fetcher.fetch();
});

export const getAnimals = cache(async (query) => {
  const elastic = connectToDatabase();

  const fetcher = new AnimalsFetcher(elastic, query);
  return await fetcher.fetch();
});
