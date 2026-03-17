import { NextFunction, Request, Response } from "express";
import { errResponse } from "../utils/apiResponse.js";

interface CustomError extends Error {
  status?: number;
}

const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";

  return errResponse(res, statusCode, message);
};

export default errorMiddleware;