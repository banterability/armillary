const {getDistance} = require("./units");

describe("#getDistance", () => {
  test("returns a distances object containing feet and miles, given meters", () => {
    const actual = getDistance(100);

    expect(actual).toHaveProperty("distance.feet", 328);
    expect(actual).toHaveProperty("distance.miles", 0.1);
  });
});
