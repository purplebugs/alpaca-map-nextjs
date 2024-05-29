export default class CompanyFetcher {
  constructor(elastic, id) {
    this.elastic = elastic;
    this.id = id;
    this.data = []; // Initial state
  }

  async _fetch(resolve, reject) {
    let result;

    try {
      result = await this.elastic.search({
        index: "companies_all",
        query: {
          match: {
            id: this.id,
          },
        },
        aggs: {
          alpacas: {
            nested: {
              path: "alpacas.status.active",
            },
            aggs: {
              gender: {
                terms: {
                  field: "alpacas.status.active.gender.keyword",
                },
              },
              color1: {
                terms: {
                  field: "alpacas.status.active.color.color1.original.keyword",
                },
              },
              color2: {
                terms: {
                  field: "alpacas.status.active.color.color2.original.keyword",
                },
              },
              color3: {
                terms: {
                  field: "alpacas.status.active.color.color3.original.keyword",
                },
              },
              colorSolid: {
                terms: {
                  field: "alpacas.status.active.color.colorSolid.original.keyword",
                },
              },
            },
          },
        },
      });
    } catch (error) {
      reject(error);
    }

    const total = result.hits.total.value;

    if (total === 0) {
      resolve([]);
      return;
    }

    const company = result.hits.hits[0]._source;
    const aggs = result.aggregations;

    this.data.push(Object.assign(company, { aggregations: aggs }));

    resolve(this.data); // Callback
  }

  fetch() {
    return new Promise((resolve, reject) => {
      this._fetch(resolve, reject);
    });
  }
}
