import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../errorhandler";
import { createProduct } from "../controllers/products";

const productRoutes = Router();

productRoutes.post(
  "/",
  [authMiddleware, authMiddleware],
  errorHandler(createProduct)
);

export default productRoutes;
