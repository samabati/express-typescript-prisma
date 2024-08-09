import express, { Express, Request, Response } from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { exceptionMiddleware } from "./middlewares/exceptionMiddleware";

const app: Express = express();

export const prismaClient = new PrismaClient({
  log: ["query"],
}).$extends({
  result: {
    address: {
      formattedAddress: {
        needs: {
          lineOne: true,
          lineTwo: true,
          city: true,
          country: true,
          zipCode: true,
        },
        compute: (add) => {
          return `${add.lineOne}, ${add.lineTwo}, ${add.city}, ${add.country}, ${add.zipCode}`;
        },
      },
    },
  },
});

app.use(express.json());

app.use("/api/v1", rootRouter);

app.use(exceptionMiddleware);

app.listen(PORT, () => console.log("App is running on port 3000"));
