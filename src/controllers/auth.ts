import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../index";
import { compareSync, hashSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secrets";
import { BadException } from "../exceptions/bad-exception";
import { ErrorCode } from "../exceptions/root";
import { UnprocessableEntityException } from "../exceptions/unprocessable";
import { signupSchema } from "../schema/users";
import { NotFoundException } from "../exceptions/not-found";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  signupSchema.parse(req.body);
  const { name, email, password } = req.body;

  let user = await prismaClient.user.findFirst({ where: { email } });

  console.log(Boolean(user));

  if (user) {
    throw new BadException(
      "User already exists in database!",
      ErrorCode.USER_ALREADY_EXISTS
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
    throw new NotFoundException(
      "User does not exist in database",
      ErrorCode.USER_NOT_FOUND
    );
  }

  if (!compareSync(password, user.password)) {
    throw new BadException(
      "Password does not match",
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  const token = jwt.sign(
    {
      userid: user.id,
    },
    JWT_SECRET
  );

  res.json({ user, token });
};

export const me = (req: Request, res: Response) => {
  res.json(req.user);
};
