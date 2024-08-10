import { Request, Response } from "express";
import { prismaClient } from "..";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";

export const createOrder = async (req: Request, res: Response) => {
  return await prismaClient.$transaction(async (tx) => {
    //Collect user cart items
    const cartItems = await tx.cartItem.findMany({
      where: {
        userId: req.user.id,
      },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      return res.json({ message: "Cart is empty" });
    }

    // Calculate cart total
    const total = cartItems.reduce((prev, curr) => {
      return prev + curr.quantity * +curr.product.price;
    }, 0);

    //Get user default address
    const address = await tx.address.findFirst({
      where: {
        id: req.user.defaultShippingAddressId!,
      },
    });

    //Create order
    const order = await tx.order.create({
      data: {
        userId: req.user.id,
        netAmount: total,
        address: address!.formattedAddress,
        products: {
          create: cartItems.map((cart) => {
            return {
              productId: cart.productId,
              quantity: cart.quantity,
            };
          }),
        },
      },
    });

    //Create order event
    const orderEvent = await tx.orderEvent.create({
      data: {
        orderId: order.id,
      },
    });

    //Delete all of users cart items.
    const deleteCartItems = await tx.cartItem.deleteMany({
      where: {
        userId: req.user.id,
      },
    });

    return res.json(order);
  });
};

export const listOrders = async (req: Request, res: Response) => {
  const orders = await prismaClient.order.findMany({
    where: {
      userId: req.user.id,
    },
  });

  res.json(orders);
};

export const cancelOrder = async (req: Request, res: Response) => {
  try {
    const order = await prismaClient.order.update({
      where: {
        id: +req.params.id,
      },
      data: {
        status: "CANCELED",
      },
    });

    const createOrderEvent = await prismaClient.orderEvent.create({
      data: {
        orderId: order.id,
        status: "CANCELED",
      },
    });

    res.json(order);
  } catch (err) {
    throw new NotFoundException(
      "Could not find order",
      ErrorCode.ORDER_NOT_FOUND
    );
  }
};

export const listOrderById = async (req: Request, res: Response) => {
  try {
    const order = await prismaClient.order.findFirstOrThrow({
      where: {
        id: +req.params.id,
      },
    });

    res.json(order);
  } catch (err) {
    throw new NotFoundException(
      "Could not find order",
      ErrorCode.ORDER_NOT_FOUND
    );
  }
};

//Lists all order for entire application in paginated way. option to pass status in body
export const listAllOrders = async (req: Request, res: Response) => {
  let where = {};
  if (req.body.status) {
    where = {
      status: req.body.status,
    };
  }

  const orders = await prismaClient.order.findMany({
    where,
    skip: +req.query.skip! || 0,
    take: 5,
  });

  res.json(orders);
};

//change an order status. accepts order id in param, status in body. creates order event for order change.
export const changeOrderStatus = async (req: Request, res: Response) => {
  try {
    const order = await prismaClient.order.update({
      where: {
        id: +req.params.id,
      },
      data: {
        status: req.body.status,
      },
    });

    const orderEvent = await prismaClient.orderEvent.create({
      data: {
        orderId: order.id,
        status: req.body.status,
      },
    });

    res.json(order);
  } catch (err) {
    throw new NotFoundException("Order not found", ErrorCode.ORDER_NOT_FOUND);
  }
};

//list orders for a particular user using pagination. id passed in url. can optionally pass in status.
export const listOrdersById = async (req: Request, res: Response) => {
  let where: any = {
    userId: +req.params.id,
  };
  if (req.body.status) {
    where = {
      ...where,
      status: req.body.status,
    };
  }
  const orders = await prismaClient.order.findMany({
    where,
    skip: +req.query.skip! || 0,
    take: 5,
  });

  res.json(orders);
};
