import { FILTER_PARAMS } from "@/constants/filters";
import type { CarFilters, CarFiltersDraft } from "@/types/filters";

import { groupDigits } from "./format";
import { mileageToNumber } from "./mileage";

interface ParamsSource {
  get(key: string): string | null;
}

function parseUnsignedIntegerParam(value: string | null): number | undefined {
  const digits = value?.replace(/\s/g, "");

  if (!digits || !/^\d+$/.test(digits)) {
    return undefined;
  }

  return Number(digits);
}

export function parseCarFilters(params: ParamsSource): CarFilters {
  const brand = params.get(FILTER_PARAMS.brand)?.trim();
  const price = parseUnsignedIntegerParam(params.get(FILTER_PARAMS.price));
  const minMileage = parseUnsignedIntegerParam(params.get(FILTER_PARAMS.minMileage));
  const maxMileage = parseUnsignedIntegerParam(params.get(FILTER_PARAMS.maxMileage));

  const hasInvertedRange =
    minMileage !== undefined && maxMileage !== undefined && minMileage > maxMileage;

  return {
    brand: brand || undefined,
    price,
    minMileage: hasInvertedRange ? maxMileage : minMileage,
    maxMileage: hasInvertedRange ? minMileage : maxMileage,
  };
}

export function serializeCarFilters(filters: CarFilters): string {
  const params = new URLSearchParams();

  if (filters.brand) {
    params.set(FILTER_PARAMS.brand, filters.brand);
  }

  if (filters.price !== undefined) {
    params.set(FILTER_PARAMS.price, String(filters.price));
  }

  if (filters.minMileage !== undefined) {
    params.set(FILTER_PARAMS.minMileage, String(filters.minMileage));
  }

  if (filters.maxMileage !== undefined) {
    params.set(FILTER_PARAMS.maxMileage, String(filters.maxMileage));
  }

  return params.toString();
}

export function searchParamsFromRecord(
  record: Record<string, string | string[] | undefined>,
): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(record)) {
    if (typeof value === "string") {
      params.set(key, value);
    } else if (Array.isArray(value) && value[0] !== undefined) {
      params.set(key, value[0]);
    }
  }

  return params;
}

export function filtersToDraft(filters: CarFilters): CarFiltersDraft {
  return {
    brand: filters.brand ?? "",
    price: filters.price === undefined ? "" : String(filters.price),
    minMileage: filters.minMileage === undefined ? "" : groupDigits(filters.minMileage),
    maxMileage: filters.maxMileage === undefined ? "" : groupDigits(filters.maxMileage),
  };
}

export function draftToFilters(draft: CarFiltersDraft): CarFilters {
  return {
    brand: draft.brand || undefined,
    price: draft.price ? Number(draft.price) : undefined,
    minMileage: mileageToNumber(draft.minMileage),
    maxMileage: mileageToNumber(draft.maxMileage),
  };
}
