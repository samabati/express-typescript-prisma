import { Request, Response, NextFunction } from "express";
import { ErrorCode, HttpException } from "./exceptions/root";
import { InternalException } from "./exceptions/internal-exception";
import { ZodError } from "zod";
import { BadException } from "./exceptions/bad-exception";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (err) {
      let exception: HttpException;
      if (err instanceof HttpException) {
        exception = err;
      } else if (err instanceof ZodError) {
        exception = new BadException(
          "Unprocessable entity",
          ErrorCode.UNPROCESSABLE_ENTITY
        );
      } else {
        exception = new InternalException(
          "Something went wrong...",
          err,
          ErrorCode.INTERNAL_ERROR
        );
      }
      next(exception);
    }
  };
};
