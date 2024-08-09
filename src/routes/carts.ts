import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../errorhandler";
import { addCartItem, deleteCartItem } from "../controllers/cart";

const cartRouter = Router();

cartRouter.post("/", [authMiddleware], errorHandler(addCartItem));
cartRouter.delete("/:id", [authMiddleware], errorHandler(deleteCartItem));

export default cartRouter;
