import type { CarLocation } from "@/types/car";

export function formatPrice(price: number): string {
  return `$${price}`;
}

export function groupDigits(value: number): string {
  return String(value).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatMileage(mileage: number): string {
  return `${groupDigits(mileage)} km`;
}

export function formatLocation(location: CarLocation | undefined): string {
  if (!location) return "";
  return [location.city, location.country].filter(Boolean).join(", ");
}

export function formatCarTitle(brand: string, model: string, year: number): string {
  return `${brand} ${model}, ${year}`;
}
