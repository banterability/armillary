const getDistance = require("./getDistance");

const decorateItemWithDistance = (item, distanceInMeters) => {
  return {
    ...item,
    ...getDistance(distanceInMeters)
  };
};

module.exports = decorateItemWithDistance;
