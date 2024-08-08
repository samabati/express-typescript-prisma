import { Request, Response } from "express";
import { productsSchema } from "../schema/products";
import { prismaClient } from "..";

export const createProduct = async (req: Request, res: Response) => {
  productsSchema.parse(req.body);

  const product = await prismaClient.product.create({
    data: {
      ...req.body,
      tags: req.body.tags.join(","),
    },
  });

  res.json(product);
};
