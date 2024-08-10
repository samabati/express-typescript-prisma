import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../errorhandler";
import {
  getUserById,
  listUsers,
  updateUser,
  updateUserRole,
} from "../controllers/users";
import { adminMiddleware } from "../middlewares/adminMiddleware";

const userRouter = Router();

userRouter.put("/", [authMiddleware], errorHandler(updateUser));
userRouter.put(
  "/:id/role",
  [authMiddleware, adminMiddleware],
  errorHandler(updateUserRole)
),
  userRouter.get(
    "/",
    [authMiddleware, adminMiddleware],
    errorHandler(listUsers)
  ),
  userRouter.get(
    "/:id",
    [authMiddleware, adminMiddleware],
    errorHandler(getUserById)
  );

export default userRouter;
