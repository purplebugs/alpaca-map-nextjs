export default class AnimalsFetcher {
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
        index: "animals_all",
        from: this.from,
        size: this.size,
        _source: ["alpacaId", "alpacaRegisteredName", "alpacaShortName", "companyId"],
        query: {
          bool: {
            minimum_should_match: 1,
            should: [
              {
                multi_match: {
                  query: this.query,
                  fields: ["alpacaRegisteredName", "alpacaShortName"],
                  fuzziness: "0",
                  type: "best_fields",
                  _name: "alpacaRegisteredName_alpacaShortName_0_fuzziness",
                },
              },
              {
                multi_match: {
                  query: this.query,
                  fields: ["alpacaRegisteredName", "alpacaShortName"],
                  fuzziness: "auto",
                  type: "best_fields",
                  _name: "alpacaRegisteredName_alpacaShortName_auto_fuzziness",
                },
              },
            ],
            filter: [{ match: { type: "alpaca" } }],
          },
        },
        highlight: {
          require_field_match: "true",
          pre_tags: ["<em>"],
          post_tags: ["</em>"],
          fields: [
            {
              alpacaRegisteredName: {},
            },
            {
              alpacaShortName: {},
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
    const animals = response.map((item) => {
      return Object.assign(item._source, item.highlight);
    });

    animals.forEach((animal) => {
      this.data.push(animal);
    });

    resolve({ total: total, items: this.data, from: this.from, size: this.size }); // Callback
  }

  fetch() {
    return new Promise((resolve, reject) => {
      this._fetch(resolve, reject);
    });
  }
}
