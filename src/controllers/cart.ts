import { Request, Response } from "express";
import { AddCartSchema, UpdateCartSchema } from "../schema/carts";
import { Product } from "@prisma/client";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { prismaClient } from "..";

export const addCartItem = async (req: Request, res: Response) => {
  const validatedData = AddCartSchema.parse(req.body);
  let product: Product;
  try {
    product = await prismaClient.product.findFirstOrThrow({
      where: {
        id: validatedData.productId,
      },
    });
  } catch (err) {
    throw new NotFoundException(
      "Product not found",
      ErrorCode.PRODUCT_NOT_FOUND
    );
  }

  const cart = await prismaClient.cartItem.create({
    data: {
      userId: req.user.id,
      ...validatedData,
    },
  });

  res.json(cart);
};

export const deleteCartItem = async (req: Request, res: Response) => {
  await prismaClient.cartItem.delete({
    where: {
      id: +req.params.id,
    },
  });

  res.json({ success: true });
};

export const updateCartQuantity = async (req: Request, res: Response) => {
  const validatedData = UpdateCartSchema.parse(req.body);
  const cart = await prismaClient.cartItem.update({
    where: {
      id: +req.params.id,
    },
    data: {
      quantity: validatedData.quantity,
    },
  });

  res.json(cart);
};

export const getCartItems = async (req: Request, res: Response) => {
  const cartItems = await prismaClient.cartItem.findMany({
    where: {
      userId: req.user.id,
    },
    include: {
      product: true,
    },
  });

  res.json(cartItems);
};
