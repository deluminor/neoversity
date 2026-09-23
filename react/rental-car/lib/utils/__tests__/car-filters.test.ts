import { describe, expect, it } from "vitest";

import {
  draftToFilters,
  filtersToDraft,
  parseCarFilters,
  searchParamsFromRecord,
  serializeCarFilters,
} from "@/lib/utils/car-filters";

describe("parseCarFilters", () => {
  it("drops values the backend would reject", () => {
    const params = new URLSearchParams({
      price: "abc",
      minMileage: "-5",
      maxMileage: "1.5",
      brand: "  ",
    });

    expect(parseCarFilters(params)).toEqual({
      brand: undefined,
      price: undefined,
      minMileage: undefined,
      maxMileage: undefined,
    });
  });

  it("drops a whitespace-only price instead of coercing to zero", () => {
    const params = new URLSearchParams({ price: "   " });

    expect(parseCarFilters(params).price).toBeUndefined();
  });

  it("swaps an inverted mileage range", () => {
    const params = new URLSearchParams({ minMileage: "9000", maxMileage: "3000" });

    expect(parseCarFilters(params)).toMatchObject({ minMileage: 3000, maxMileage: 9000 });
  });

  it("round-trips through serialization", () => {
    const filters = { brand: "Volvo", price: 50, minMileage: 1000, maxMileage: 8000 };
    const params = new URLSearchParams(serializeCarFilters(filters));

    expect(parseCarFilters(params)).toEqual(filters);
  });
});

describe("draft conversion", () => {
  it("keeps grouped mileage input usable as a number", () => {
    const draft = filtersToDraft({ minMileage: 5500 });

    expect(draft.minMileage).toBe("5 500");
    expect(draftToFilters(draft).minMileage).toBe(5500);
  });
});

describe("searchParamsFromRecord", () => {
  it("takes the first value of repeated params", () => {
    const params = searchParamsFromRecord({ brand: ["Audi", "BMW"], price: "40", page: undefined });

    expect(params.get("brand")).toBe("Audi");
    expect(params.get("price")).toBe("40");
    expect(params.get("page")).toBeNull();
  });
});
