import { z } from "zod";

export const CarFiltersOptionsSchema = z.object({
  brands: z.array(z.string()),
  price: z.object({
    min: z.coerce.number(),
    max: z.coerce.number(),
  }),
});
