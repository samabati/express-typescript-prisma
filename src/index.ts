import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { exceptionMiddleware } from "./middlewares/exceptionMiddleware";

const app: Express = express();

export const prismaClient = new PrismaClient({
  log: ["query"],
});

app.use(express.json());

app.use("/api/v1", rootRouter);

app.use(exceptionMiddleware);

app.listen(PORT, () => console.log("App is running on port 3000"));
