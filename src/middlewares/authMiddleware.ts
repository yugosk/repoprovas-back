import { Request, Response, NextFunction } from "express";
import { validate } from "../utils/tokenUtils";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers["authorization"];
  const token = authorization?.replace("Bearer ", "");

  if (!token) {
    throw "invalid_token";
  }

  try {
    const user = await validate(token);
    next();
  } catch (err: ErrorEvent | any) {
    throw "invalid_token";
  }
}
