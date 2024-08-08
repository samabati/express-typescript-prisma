import { Request, Response, NextFunction } from "express";
import { UnauthorizedException } from "../exceptions/unauthorized";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { prismaClient } from "..";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization!;

  if (!token) {
    next(
      new UnauthorizedException(
        "No token provided",
        ErrorCode.UNAUTHORIZED_USER
      )
    );
  }

  try {
    const payload = jwt.sign(token, JWT_SECRET) as any;

    const user = await prismaClient.user.findFirst({
      where: { id: payload.userid },
    });

    if (!user) {
      next(
        new UnauthorizedException("User not found", ErrorCode.UNAUTHORIZED_USER)
      );
    }

    req.user = user as any;
    next();
  } catch (err) {}
};
