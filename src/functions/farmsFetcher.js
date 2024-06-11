export default class FarmsFetcher {
  constructor(elastic) {
    this.elastic = elastic;
    this.data = []; // Initial state

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
        query: {
          bool: {
            must: [
              {
                match_all: {},
              },
            ],
            filter: [
              {
                exists: {
                  field: "lat",
                },
              },
              {
                exists: {
                  field: "lng",
                },
              },
            ],
          },
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
    const farms = response.map((item) => item._source);

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
