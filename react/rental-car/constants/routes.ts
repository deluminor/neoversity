export const ROUTES = {
  home: "/",
  catalog: "/catalog",
  car: (carId: string): string => `/catalog/${carId}`,
} as const;
