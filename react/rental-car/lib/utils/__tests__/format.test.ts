import { describe, expect, it } from "vitest";

import { formatLocation, formatMileage, formatPrice } from "@/lib/utils/format";

describe("formatters", () => {
  it("groups mileage thousands with a space", () => {
    expect(formatMileage(9582)).toBe("9 582 km");
    expect(formatMileage(958)).toBe("958 km");
  });

  it("prefixes price with a dollar sign", () => {
    expect(formatPrice(40)).toBe("$40");
  });

  it("renders city and country", () => {
    expect(formatLocation({ country: "Ukraine", city: "Kyiv", address: "1 Street" })).toBe(
      "Kyiv, Ukraine",
    );
    expect(formatLocation(undefined)).toBe("");
  });
});
