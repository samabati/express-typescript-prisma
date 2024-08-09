import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../errorhandler";
import {
  addCartItem,
  deleteCartItem,
  getCartItems,
  updateCartQuantity,
} from "../controllers/cart";

const cartRouter = Router();

cartRouter.post("/", [authMiddleware], errorHandler(addCartItem));
cartRouter.delete("/:id", [authMiddleware], errorHandler(deleteCartItem));
cartRouter.put("/:id", [authMiddleware], errorHandler(updateCartQuantity));
cartRouter.get("/", [authMiddleware], errorHandler(getCartItems));

export default cartRouter;
