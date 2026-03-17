import { NextFunction, Request, Response } from "express";
import { decryptData } from "../services/decryptionServices.js";
import { errResponse } from "../utils/apiResponse.js";

type DecryptedBody = Record<string, unknown>;

export const decryptMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    if (req.body?.data) {
      const decrypted = decryptData<DecryptedBody>(req.body.data);
      req.body = decrypted as typeof req.body;
    }

    next();
  } catch (err: unknown) {
    if(err instanceof Error) throw new Error("Decrypt Middleware err is "+err.message)
    return errResponse(res, 400, "Invalid encrypted payload");
  }
};