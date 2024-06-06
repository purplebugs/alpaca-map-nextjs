import { Client } from "@elastic/elasticsearch";
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

export async function getAnimal(id) {
  const db = connectToDatabase();
  const fetcher = new AnimalFetcher(db, id);
  return await fetcher.fetch();
}

export async function getAnimals(query) {
  const db = connectToDatabase();
  const fetcher = new AnimalsFetcher(db, query);

  return await fetcher.fetch();
}

export async function getCompany(id) {
  const db = connectToDatabase();
  const fetcher = new CompanyFetcher(db, id);
  return await fetcher.fetch();
}

export async function getCompanies(query) {
  const db = connectToDatabase();
  const fetcher = new CompaniesFetcher(db, query);

  return await fetcher.fetch();
}

export async function getFarms() {
  const db = connectToDatabase();
  const fetcher = new FarmsFetcher(db);

  return await fetcher.fetch();
}

export async function getLocations(query) {
  const db = connectToDatabase();
  const fetcher = new LocationsFetcher(db, query);

  return await fetcher.fetch();
}

export async function getGeoDistanceRadius(lat, lng, radius, publicFarms, privateFarms) {
  const db = connectToDatabase();
  const fetcher = new GeoDistanceRadiusFetcher(db, lat, lng, radius, publicFarms, privateFarms);

  return await fetcher.fetch();
}
