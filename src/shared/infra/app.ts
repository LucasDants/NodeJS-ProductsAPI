import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import path from "path";

import "reflect-metadata";
import "express-async-errors";
import "../../shared/container/index";
import "dotenv/config";

import { AppError } from "../../shared/error/AppError";
import { router } from "./routes/index.routes";
import swaggerDocument from "./swagger.json";

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "..", "..", "uploads"))
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({
      message: err.message,
    });
  }

  return res.status(500).send({
    status: "error",
    message: err.message,
  });
});

export { app };
