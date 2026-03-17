import { decryptData } from "../services/decryptionServices.js";
import { errResponse } from "../utils/apiResponse.js";
export const decryptMiddleware = (req, res, next) => {
    try {
        if (req.body?.data) {
            const decrypted = decryptData(req.body.data);
            req.body = decrypted;
        }
        next();
    }
    catch (err) {
        if (err instanceof Error)
            throw new Error("Decrypt Middleware err is " + err.message);
        return errResponse(res, 400, "Invalid encrypted payload");
    }
};
//# sourceMappingURL=decryptMiddleware.js.map