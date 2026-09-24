import { MILEAGE_MAX_DIGITS } from "@/constants/filters";

import { groupDigits } from "./format";

export function sanitizeMileageInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, MILEAGE_MAX_DIGITS);
  if (!digits) return "";

  return groupDigits(Number(digits));
}

export function mileageToNumber(value: string): number | undefined {
  const digits = value.replace(/\D/g, "");
  return digits ? Number(digits) : undefined;
}
