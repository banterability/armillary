const decorateItemWithDistance = require("../decorator");

describe("#decorateItemWithDistance", () => {
  let actual;
  beforeAll(() => {
    actual = decorateItemWithDistance({key1: "value1", key2: "value2"}, 100);
  });
  test("returns all an items existing keys", () => {
    expect(actual).toHaveProperty("key1", "value1");
    expect(actual).toHaveProperty("key2", "value2");
  });

  test("returns a distance key containing feet and miles, given meters", () => {
    expect(actual).toHaveProperty("distance.feet", 328);
    expect(actual).toHaveProperty("distance.miles", 0.1);
  });
});
