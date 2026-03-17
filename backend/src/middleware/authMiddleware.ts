import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { errResponse } from "../utils/apiResponse.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      session:{
        userId:string;
      }
    }
  }
}


const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    if (!JWT_SECRET) {
      return errResponse(res, 500, "JWT_SECRET required!");
    }

    const { token } = req.cookies;

    if (!token) {
      return errResponse(res, 401, "Unauthorized User");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decoded.id) {
      return errResponse(res, 401, "Invalid token payload");
    }

    req.userId = decoded.id as string;

    next();
  } catch (err: unknown) {
    return errResponse(res, 401, "Invalid or expired token");
  }
};

export const sessionAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const userId = (req.session)?.userId;

    if (!userId) {
      return errResponse(res, 401, "Unauthorized User");
    }

    req.userId = userId;

    next();
  } catch (err: unknown) {
    return errResponse(res, 401, "Invalid session");
  }
};
export default authMiddleware;