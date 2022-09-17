import { Request, Response, NextFunction } from "express";
import { errorHandler, IAppError } from "../utils/errorUtils";

export default function errorMiddleware(
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error: IAppError = errorHandler(err);
  return res.status(error.code).send(error.message);
}
