export const API_ENDPOINTS = {
  cars: "/cars",
  carsFilters: "/cars/filters",
  car: (carId: string): string => `/cars/${carId}`,
  carBookingRequests: (carId: string): string => `/cars/${carId}/booking-requests`,
} as const;

export const REQUEST_TIMEOUT_MS = 15_000;
