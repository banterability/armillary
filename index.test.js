const Armillary = require("./index");

describe("Armillary", () => {
  let locations;

  beforeAll(() => {
    locations = new Armillary([
      {name: "Clark/Lake", latitude: 41.885737, longitude: -87.630886},
      {name: "O'Hare", latitude: 41.97766526, longitude: -87.90422307},
      {name: "95th/Dan Ryan", latitude: 41.722377, longitude: -87.624342}
    ]);
  });

  test("returns number of items as length", () => {
    expect(locations.length).toBe(3);
  });

  describe("bounds", () => {
    test("returns a box containing all locations", () => {
      expect(locations.getBounds()).toMatchSnapshot();
    });
  });

  describe("getNearest", () => {
    test("returns the closest location to a given point", () => {
      const actual = locations.getNearest({
        latitude: 41.882053,
        longitude: -87.627793
      });

      expect(actual).toHaveProperty("name", "Clark/Lake");
      expect(actual).toHaveProperty("distance.feet", 1585);
    });

    test("returns mutiple closest locations when passed a limit", () => {
      const actual = locations.getNearest(
        {latitude: 41.882053, longitude: -87.627793},
        2
      );

      expect(actual[0]).toHaveProperty("name", "Clark/Lake");
      expect(actual[0]).toHaveProperty("distance.feet", 1585);

      expect(actual[1]).toHaveProperty("name", "95th/Dan Ryan");
      expect(actual[1]).toHaveProperty("distance.miles", 11);
    });
  });

  describe("withDistance", () => {
    test("returns all locations with distance from a given point", () => {
      expect(
        locations.withDistances({latitude: 41.882053, longitude: -87.627793})
      ).toMatchSnapshot();
    });
  });
});
