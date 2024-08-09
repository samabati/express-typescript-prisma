import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { errorHandler } from "../errorhandler";
import { updateUser } from "../controllers/users";

const userRouter = Router();

userRouter.put("/", [authMiddleware], errorHandler(updateUser));

export default userRouter;
