import { Client } from "@elastic/elasticsearch";
import AnimalFetcher from "@/functions/animalFetcher.js";
import AnimalsFetcher from "@/functions/animalsFetcher.js";
import CompanyFetcher from "@/functions/companyFetcher.js";
import CompaniesFetcher from "@/functions/companiesFetcher.js";
import FarmsFetcher from "@/functions/farmsFetcher.js";
import GeoDistanceRadiusFetcher from "@/functions/geoDistanceRadiusFetcher.js";
import LocationsFetcher from "@/functions/locationsFetcher.js";

export default class Database {
  constructor() {
    this.elastic = new Client({
      cloud: {
        id: process.env.ELASTIC_CLOUD_ID,
      },
      auth: {
        apiKey: process.env.ELASTIC_API_KEY,
      },
    });

    console.log("Testing", process.env.ELASTIC_CLOUD_ID.substring(0, 4));
  }

  async getAnimal(id) {
    const fetcher = new AnimalFetcher(this.elastic, id);
    return await fetcher.fetch();
  }

  async getAnimals(query) {
    const fetcher = new AnimalsFetcher(this.elastic, query);

    return await fetcher.fetch();
  }

  async getCompany(id) {
    const fetcher = new CompanyFetcher(this.elastic, id);
    return await fetcher.fetch();
  }

  async getCompanies(query) {
    const fetcher = new CompaniesFetcher(this.elastic, query);

    return await fetcher.fetch();
  }

  async getFarms() {
    const fetcher = new FarmsFetcher(this.elastic);

    return await fetcher.fetch();
  }

  async getLocations(query) {
    const fetcher = new LocationsFetcher(this.elastic, query);

    return await fetcher.fetch();
  }

  async getGeoDistanceRadius(lat, lng, radius, publicFarms, privateFarms) {
    const fetcher = new GeoDistanceRadiusFetcher(this.elastic, lat, lng, radius, publicFarms, privateFarms);

    return await fetcher.fetch();
  }
}
