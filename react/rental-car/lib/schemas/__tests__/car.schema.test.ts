import { describe, expect, it } from "vitest";

import { CarSchema } from "@/lib/schemas/car.schema";

const rawCar = {
  id: "11a3ab35-07b8-4336-b06b-602cdc309f2c",
  brand: "Buick",
  model: "Enclave",
  year: 2008,
  type: "SUV",
  img: "https://ac.goit.global/car-rental-task/9582-ai.jpg",
  rentalPrice: "40",
  fuelConsumption: "10.5",
  mileage: 5858,
  stockNumber: 9582,
};

describe("CarSchema", () => {
  it("coerces money and consumption strings into numbers", () => {
    const car = CarSchema.parse(rawCar);

    expect(car.rentalPrice).toBe(40);
    expect(car.fuelConsumption).toBe(10.5);
  });

  it("defaults optional collections so the UI can map safely", () => {
    const car = CarSchema.parse(rawCar);

    expect(car.features).toEqual([]);
    expect(car.rentalConditions).toEqual([]);
  });

  it("rejects a car without an id", () => {
    const withoutId: Record<string, unknown> = { ...rawCar };
    delete withoutId.id;

    expect(() => CarSchema.parse(withoutId)).toThrow();
  });
});
