import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { errResponse } from "../utils/apiResponse.js";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = (req, res, next) => {
    try {
        if (!JWT_SECRET) {
            return errResponse(res, 500, "JWT_SECRET required!");
        }
        const { token } = req.cookies;
        if (!token) {
            return errResponse(res, 401, "Unauthorized User");
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        if (!decoded.id) {
            return errResponse(res, 401, "Invalid token payload");
        }
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        return errResponse(res, 401, "Invalid or expired token");
    }
};
export const sessionAuthMiddleware = (req, res, next) => {
    try {
        const userId = (req.session)?.userId;
        if (!userId) {
            return errResponse(res, 401, "Unauthorized User");
        }
        req.userId = userId;
        next();
    }
    catch (err) {
        return errResponse(res, 401, "Invalid session");
    }
};
export default authMiddleware;
//# sourceMappingURL=authMiddleware.js.map