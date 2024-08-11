import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../errorhandler";
import {
  createProduct,
  deleteProduct,
  findProductById,
  listProducts,
  searchProducts,
  updateProduct,
} from "../controllers/products";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const productRoutes = Router();

productRoutes.get("/search", [authMiddleware], errorHandler(searchProducts));

productRoutes.post(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(createProduct)
);
productRoutes.put(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(updateProduct)
);
productRoutes.delete(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(deleteProduct)
);
productRoutes.get(
  "/",
  [authMiddleware, adminMiddleware],
  errorHandler(listProducts)
);
productRoutes.get(
  "/:id",
  [authMiddleware, adminMiddleware],
  errorHandler(findProductById)
);

export default productRoutes;
