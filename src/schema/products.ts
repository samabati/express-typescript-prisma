import { describe } from "node:test";
import { z } from "zod";

export const productsSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  tags: z.array(z.string()),
});
