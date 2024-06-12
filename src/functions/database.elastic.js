import { Client } from "@elastic/elasticsearch";
import { cache } from "react";
import AnimalFetcher from "@/functions/animalFetcher.js";
import AnimalsFetcher from "@/functions/animalsFetcher.js";
import CompanyFetcher from "@/functions/companyFetcher.js";
import CompaniesFetcher from "@/functions/companiesFetcher.js";
import FarmsFetcher from "@/functions/farmsFetcher.js";
import GeoDistanceRadiusFetcher from "@/functions/geoDistanceRadiusFetcher.js";
import LocationsFetcher from "@/functions/locationsFetcher.js";

let elastic = null;

const connectToDatabase = () => {
  if (!elastic) {
    elastic = new Client({
      cloud: {
        id: process.env.ELASTIC_CLOUD_ID,
      },
      auth: {
        apiKey: process.env.ELASTIC_API_KEY,
      },
    });
  }
  return elastic;
};

export const getAnimal = cache(async (id) => {
  const db = connectToDatabase();
  const fetcher = new AnimalFetcher(db, id);
  return await fetcher.fetch();
});

export const getAnimals = cache(async (query, from, size) => {
  const db = connectToDatabase();

  console.log("db - from", from);
  console.log("db - size", size);
  const fetcher = new AnimalsFetcher(db, query, from, size);

  return await fetcher.fetch();
});

export const getCompany = cache(async (id) => {
  const db = connectToDatabase();
  const fetcher = new CompanyFetcher(db, id);
  return await fetcher.fetch();
});

export const getCompanies = cache(async (query) => {
  const db = connectToDatabase();
  const fetcher = new CompaniesFetcher(db, query);

  return await fetcher.fetch();
});

export const getFarms = cache(async () => {
  const db = connectToDatabase();
  const fetcher = new FarmsFetcher(db);

  return await fetcher.fetch();
});

export const getLocations = cache(async (query) => {
  const db = connectToDatabase();
  const fetcher = new LocationsFetcher(db, query);

  return await fetcher.fetch();
});

export const getGeoDistanceRadius = cache(async (lat, lng, radius, publicFarms, privateFarms) => {
  const db = connectToDatabase();
  const fetcher = new GeoDistanceRadiusFetcher(db, lat, lng, radius, publicFarms, privateFarms);

  return await fetcher.fetch();
});
