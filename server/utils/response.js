const Response = (res, data = {}, statusCode = 200, message) => {
    return res.status(statusCode).json({
        success: true,
        message,
        data: {...data}
    });
}

const ErrorResponse = (res, error, statusCode = 500) => {
    const code = error.statusCode || statusCode;
    return res.status(code).json({
        success: false,
        message: error.message,
        error: error
    });
}

export {
    Response,
    ErrorResponse
};