import { replaceHighlight } from "@/functions/utils.js";

export default class LocationsFetcher {
  constructor(elastic, query = "") {
    this.elastic = elastic;
    this.data = []; // Initial stated

    this.query = query;
    this.from = 0;
    this.size = 25;
    this.continue = true;
    this.maxTotal = 999;
  }

  async _fetch(resolve, reject) {
    let result;

    try {
      result = await this.elastic.search({
        index: "farms_all",
        from: this.from,
        size: this.size,
        _source: [
          "id",
          "name",
          "location.google.administrative_area_level_1",
          "location.google.administrative_area_level_2",
          "highlight",
        ],
        query: {
          bool: {
            minimum_should_match: 1,
            should: [
              {
                match: {
                  "location.google.administrative_area_level_1": {
                    query: this.query,
                    fuzziness: "auto",
                    _name: "administrative_area_level_1",
                  },
                },
              },
              {
                match: {
                  "location.google.administrative_area_level_2": {
                    query: this.query,
                    fuzziness: "auto",
                    _name: "administrative_area_level_2",
                  },
                },
              },
            ],
          },
        },
        highlight: {
          require_field_match: "true",
          pre_tags: ["<em>"],
          post_tags: ["</em>"],
          fields: [
            {
              "location.google.administrative_area_level_1": {},
            },
            {
              "location.google.administrative_area_level_2": {},
            },
          ],
        },
      });
    } catch (error) {
      reject(error);
    }

    const total = result.hits.total.value <= this.maxTotal ? result.hits.total.value : this.maxTotal;

    if (total === 0) {
      resolve({ total: 0, items: [] });
      return;
    }

    const response = result.hits.hits;
    const farms = response.map((item) => {
      return replaceHighlight(item._source, item.highlight);
    });

    farms.forEach((farm) => {
      this.data.push(farm);
    });

    this.from = this.from + this.size;

    this.continue = this.from <= total;

    if (this.continue) {
      await this._fetch(resolve); // Callback
      return;
    }

    resolve({ total: total, items: this.data }); // Callback
  }

  fetch() {
    return new Promise((resolve, reject) => {
      this._fetch(resolve, reject);
    });
  }
}
