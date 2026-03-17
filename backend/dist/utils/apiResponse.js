export const successResponse = (res, statusCode, data, message) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};
export const errResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};
//# sourceMappingURL=apiResponse.js.map