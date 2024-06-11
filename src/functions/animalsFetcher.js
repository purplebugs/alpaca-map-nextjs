export default class AnimalsFetcher {
  constructor(elastic, query = "") {
    this.elastic = elastic;
    this.data = []; // Initial stated

    this.query = query;
    this.from = 0;
    this.size = 100;
    this.continue = true;
    this.maxTotal = 10000;
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
                  fuzziness: "auto",
                  type: "best_fields",
                  _name: "alpacaRegisteredName_alpacaShortName",
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

    const total = result.hits.total.value <= this.maxTotal ? result.hits.total.value : this.maxTotal;

    if (total === 0) {
      resolve({ total: 0, items: [] });
      return;
    }

    const response = result.hits.hits;
    const animals = response.map((item) => {
      return Object.assign(item._source, item.highlight);
    });

    animals.forEach((animal) => {
      this.data.push(animal);
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
