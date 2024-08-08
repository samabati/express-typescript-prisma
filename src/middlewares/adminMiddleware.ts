import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  console.log(user);

  if (user.role == "ADMIN") {
    next();
  } else {
    next(
      new UnauthorizedException(
        "Unauthorized user",
        ErrorCode.UNAUTHORIZED_USER
      )
    );
  }
};
