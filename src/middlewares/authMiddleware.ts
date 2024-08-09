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
  const authHeader = req.headers.authorization!;
  if (!authHeader) {
    next(
      new UnauthorizedException(
        "No token provided",
        ErrorCode.UNAUTHORIZED_USER
      )
    );
  }

  try {
    //remove the bearer from token string
    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET) as any;

    const user = await prismaClient.user.findFirst({
      where: { id: payload.userid },
    });

    console.log("payload", payload.userid);

    if (!user) {
      next(
        new UnauthorizedException("User not found", ErrorCode.UNAUTHORIZED_USER)
      );
    }

    req.user = user as any;
    next();
  } catch (err) {
    next(
      new UnauthorizedException("Invalid token", ErrorCode.UNAUTHORIZED_USER)
    );
  }
};
