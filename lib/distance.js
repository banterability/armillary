const geolib = require("geolib");

const metersToFeet = meters => geolib.convertUnit("ft", meters, 0);
const metersToMiles = meters => geolib.convertUnit("mi", meters, 1);

const getDistance = meters => {
  return {
    distance: {
      feet: metersToFeet(meters),
      miles: metersToMiles(meters)
    }
  };
};

module.exports = getDistance;
