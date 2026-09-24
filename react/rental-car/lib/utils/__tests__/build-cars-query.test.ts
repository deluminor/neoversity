import { describe, expect, it } from "vitest";

import { PER_PAGE } from "@/constants/pagination";
import { buildCarsQuery } from "@/lib/utils/build-cars-query";

describe("buildCarsQuery", () => {
  it("always requests the backend page size", () => {
    expect(buildCarsQuery({}, 3)).toEqual({
      page: 3,
      perPage: PER_PAGE,
      brand: undefined,
      price: undefined,
      minMileage: undefined,
      maxMileage: undefined,
    });
  });

  it("forwards every provided filter", () => {
    expect(
      buildCarsQuery({ brand: "Buick", price: 40, minMileage: 3000, maxMileage: 5500 }, 1),
    ).toEqual({
      page: 1,
      perPage: PER_PAGE,
      brand: "Buick",
      price: 40,
      minMileage: 3000,
      maxMileage: 5500,
    });
  });
});
