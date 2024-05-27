import { Client } from "@elastic/elasticsearch";
import AnimalFetcher from "@/functions/animalFetcher.js";
import CompanyFetcher from "@/functions/companyFetcher.js";
import FarmsFetcher from "@/functions/farmsFetcher.js";
import GeoDistanceRadiusFetcher from "@/functions/geoDistanceRadiusFetcher.js";

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
  }

  async getAnimal(id) {
    const fetcher = new AnimalFetcher(this.elastic, id);
    return await fetcher.fetch();
  }

  async getCompany(id) {
    const fetcher = new CompanyFetcher(this.elastic, id);
    return await fetcher.fetch();
  }

  async getFarms() {
    const fetcher = new FarmsFetcher(this.elastic);

    return await fetcher.fetch();
  }

  async getGeoDistanceRadius(lat, lng, radius, publicFarms, privateFarms) {
    const fetcher = new GeoDistanceRadiusFetcher(this.elastic, lat, lng, radius, publicFarms, privateFarms);

    return await fetcher.fetch();
  }
}
