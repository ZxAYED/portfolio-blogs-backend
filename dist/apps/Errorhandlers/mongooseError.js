"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseError = (err) => {
    const errorSource = Object.values(err.errors).map((value) => {
        return {
            path: value.path,
            message: value.message,
        };
    });
    const statusCode = 400;
    return {
        errorSource,
        message: 'Validation Error',
        statusCode,
    };
};
exports.default = handleMongooseError;
