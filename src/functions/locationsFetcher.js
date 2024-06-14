import { replaceHighlight } from "@/functions/utils.js";

export default class LocationsFetcher {
  constructor(elastic, query = "", from, size) {
    this.elastic = elastic;
    this.data = []; // Initial stated

    this.query = query;
    this.from = from ?? 0;
    this.size = size ?? 100;
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
                multi_match: {
                  query: this.query,
                  fields: [
                    "location.google.administrative_area_level_1",
                    "location.google.administrative_area_level_2",
                  ],
                  fuzziness: "0",
                  type: "best_fields",
                  _name: "administrative_area_level_1_2_fuzziness_0",
                },
              },
              {
                multi_match: {
                  query: this.query,
                  fields: [
                    "location.google.administrative_area_level_1",
                    "location.google.administrative_area_level_2",
                  ],
                  fuzziness: "auto",
                  type: "best_fields",
                  _name: "administrative_area_level_1_2_fuzziness_auto",
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

    const total = result.hits.total.value;

    if (total === 0) {
      resolve({ total: 0, items: [], from: this.from, size: this.size });
      return;
    }

    const response = result.hits.hits;
    const farms = response.map((item) => {
      return replaceHighlight(item._source, item.highlight);
    });

    farms.forEach((farm) => {
      this.data.push(farm);
    });

    resolve({ total: total, items: this.data, from: this.from, size: this.size }); // Callback
  }

  fetch() {
    return new Promise((resolve, reject) => {
      this._fetch(resolve, reject);
    });
  }
}
