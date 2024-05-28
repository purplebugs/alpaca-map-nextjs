export default class GeoDistanceRadiusFetcher {
  constructor(elastic, lat, lng, radius, publicFarms, privateFarms) {
    this.elastic = elastic;
    this.data = []; // Initial state
    this.from = 0;
    this.size = 25; // Google limit of 25 at a time Ref: https://developers.google.com/maps/documentation/distance-matrix/usage-and-billing#other-usage-limits
    this.continue = true;
    this.maxTotal = 999;

    this.lat = lat;
    this.lng = lng;
    this.radius = radius;
    this.publicFarms = publicFarms;
    this.privateFarms = privateFarms;
  }

  async _fetch(resolve, reject) {
    let result;
    let filter = [];

    filter.push({
      geo_distance: {
        "distance": this.radius,
        "location.coordinates": {
          lat: this.lat,
          lon: this.lng,
        },
      },
    });

    if (this.publicFarms === true && this.privateFarms === true) {
      console.debug(
        `✅ [LOG] Showing ALL farms. Current facets: public:${this.publicFarms}, private:${this.privateFarms}`
      );
    }

    if (!(this.publicFarms === true && this.privateFarms === true)) {
      console.debug(
        `✅ [LOG] Showing FILTERED farms. Current facets: public:${this.publicFarms}, private:${this.privateFarms}`
      );

      filter.push(
        {
          term: {
            public: this.publicFarms,
          },
        },
        {
          term: {
            private: this.privateFarms,
          },
        }
      );
    }

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
            filter: filter,
          },
        },
        sort: [
          {
            _geo_distance: {
              "location.coordinates": {
                lat: this.lat,
                lon: this.lng,
              },
              "order": "asc",
              "distance_type": "arc",
              "ignore_unmapped": true,
            },
          },
        ],
      });
    } catch (error) {
      reject(error);
    }

    const total = result.hits.total.value <= this.maxTotal ? result.hits.total.value : this.maxTotal;

    if (total === 0) {
      resolve([]);
      return;
    }

    const response = result.hits.hits;
    response.forEach((item) => {
      this.data.push(item._source);
    });

    this.from = this.from + this.size;

    this.continue = this.from <= total;

    if (this.continue) {
      await this._fetch(resolve); // Callback
      return;
    }

    resolve(this.data); // Callback
  }

  fetch() {
    return new Promise((resolve, reject) => {
      this._fetch(resolve, reject);
    });
  }
}
