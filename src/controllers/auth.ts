import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../index";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadException } from "../exceptions/bad-exception";
import { ErrorCode } from "../exceptions/root";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  console.log(Boolean(user));

  if (user) {
    return next(
      new BadException(
        "User already exists in database!",
        ErrorCode.USER_ALREADY_EXISTS
      )
    );
  }

  user = await prismaClient.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  res.json(user);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });
  if (!user) {
    throw Error("user does not exist");
  }

  if (!compareSync(password, user.password)) {
    throw Error("password don't match");
  }

  const token = jwt.sign(
    {
      userid: user.id,
    },
    JWT_SECRET
  );

  res.json({ user, token });
};
