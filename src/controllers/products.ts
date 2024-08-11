import { Request, Response } from "express";
import { productsSchema } from "../schema/products";
import { prismaClient } from "..";
import { BadException } from "../exceptions/bad-exception";
import { ErrorCode } from "../exceptions/root";
import { NotFoundException } from "../exceptions/not-found";

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

export const updateProduct = async (req: Request, res: Response) => {
  try {
    let product = req.body;
    if (product.tags) {
      product.tags = product.tags.join(",");
    }

    const update = await prismaClient.product.update({
      where: {
        id: +req.params.id,
      },
      data: product,
    });

    res.json(update);
  } catch (err) {
    throw new BadException(
      "Unable to update product",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deleted = await prismaClient.product.delete({
      where: {
        id: +req.params.id,
      },
    });

    res.json(deleted);
  } catch (err) {
    throw new BadException(
      "Unable to delete user",
      ErrorCode.UNPROCESSABLE_ENTITY
    );
  }
};

export const listProducts = async (req: Request, res: Response) => {
  const count = await prismaClient.product.count();
  const products = await prismaClient.product.findMany({
    skip: +req.query.skip! || 0,
    take: 5,
  });
  res.json({
    count,
    products,
  });
};

export const findProductById = async (req: Request, res: Response) => {
  try {
    const product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: +req.params.id,
      },
    });
    res.json(product);
  } catch (err) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  const products = await prismaClient.product.findMany({
    where: {
      name: {
        search: req.query.q?.toString(),
      },
      description: {
        search: req.query.q?.toString(),
      },
      tags: {
        search: req.query.q?.toString(),
      },
    },
  });

  console.log("pruducts", products);

  res.json(products);
};
