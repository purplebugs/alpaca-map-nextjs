import { Client } from "@elastic/elasticsearch";
import CompanyFetcher from "@/functions/companyFetcher.js";
import AnimalFetcher from "./animalFetcher";

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
}
