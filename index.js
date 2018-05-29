const geolib = require("geolib");
const {decorateItemWithDistance} = require("./lib");

class Armillary {
  constructor(items = []) {
    this.items = items;
  }

  getBounds() {
    return geolib.getBounds(this.items);
  }

  getNearest(point, limit = 1) {
    const nearest = geolib.findNearest(point, this.items, 0, limit);

    if (Array.isArray(nearest)) {
      return nearest.map(({key, distance}) =>
        decorateItemWithDistance(this.items[key], distance)
      );
    }

    return decorateItemWithDistance(this.items[nearest.key], nearest.distance);
  }

  get length() {
    return this.items.length;
  }

  withDistances(point) {
    const {latitude, longitude} = point;

    return this.items.map(item => {
      const meters = geolib.getDistance(
        {latitude, longitude},
        {latitude: item.latitude, longitude: item.longitude}
      );

      return decorateItemWithDistance(item, meters);
    });
  }
}

module.exports = Armillary;
