import { errResponse } from "../utils/apiResponse.js";
const errorMiddleware = (err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    return errResponse(res, statusCode, message);
};
export default errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map