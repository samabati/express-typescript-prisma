import { z } from "zod";

export const AddCartSchema = z.object({
  productId: z.number(),
  quantity: z.number(),
});

export const UpdateCartSchema = z.object({
  quantity: z.number(),
});
