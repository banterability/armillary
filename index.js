const geolib = require("geolib");
const {getDistance} = require("./lib/units");

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
        this._decorateItemWithDistance(key, distance)
      );
    }

    return this._decorateItemWithDistance(nearest.key, nearest.distance);
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

      return {
        ...item,
        ...getDistance(meters)
      };
    });
  }

  _decorateItemWithDistance(index, distance) {
    const item = this.items[index];
    return {
      ...item,
      ...getDistance(distance)
    };
  }
}

module.exports = Armillary;
