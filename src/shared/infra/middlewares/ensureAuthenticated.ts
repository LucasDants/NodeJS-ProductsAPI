import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../../../config/auth";

import { AppError } from "../../../shared/error/AppError";

export async function ensureAuthenticated(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Account unauthenticated", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: accountId } = verify(
      token,
      String(authConfig.jwt.secretToken)
    );

    req.account = {
      accountId: accountId as string,
    };

    next();
  } catch {
    throw new AppError("Invalid account authentication", 401);
  }
}
