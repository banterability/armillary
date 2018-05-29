const getDistance = require("./distance");

const decorateItemWithDistance = (item, distanceInMeters) => {
  return {
    ...item,
    ...getDistance(distanceInMeters)
  };
};

module.exports = decorateItemWithDistance;
