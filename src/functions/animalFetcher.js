export default class AnimalFetcher {
  constructor(elastic, id) {
    this.elastic = elastic;
    this.id = id;
    this.data = []; // Initial state
  }

  async _fetch(resolve, reject) {
    let result;

    try {
      result = await this.elastic.search({
        index: "animals_all",
        query: {
          match: {
            alpacaId: this.id,
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

    const animal = result.hits.hits[0]._source;

    this.data.push(animal);

    resolve(this.data); // Callback
  }

  fetch() {
    return new Promise((resolve, reject) => {
      this._fetch(resolve, reject);
    });
  }
}
