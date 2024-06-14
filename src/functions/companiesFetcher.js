export default class CompaniesFetcher {
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
        _source: ["id", "name"],
        query: {
          bool: {
            minimum_should_match: 1,
            should: [
              {
                match: {
                  name: {
                    query: this.query,
                    fuzziness: "0",
                    _name: "name_fuzziness_0",
                  },
                },
              },
              {
                match: {
                  name: {
                    query: this.query,
                    fuzziness: "auto",
                    _name: "name_fuzziness_auto",
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
              name: {},
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
      return Object.assign(item._source, item.highlight);
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
