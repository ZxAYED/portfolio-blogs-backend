"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zodError_1 = __importDefault(require("./zodError"));
const zod_1 = require("zod");
const mongooseError_1 = __importDefault(require("./mongooseError"));
const castError_1 = __importDefault(require("./castError"));
const AppError_1 = __importDefault(require("./AppError"));
const duplicateError_1 = __importDefault(require("./duplicateError"));
function isValidationError(err) {
    return (err === null || err === void 0 ? void 0 : err.name) === 'ValidationError';
}
function isCastError(err) {
    return (err === null || err === void 0 ? void 0 : err.name) === 'CastError';
}
function isMongoError(err) {
    return (err === null || err === void 0 ? void 0 : err.name) === 'MongoError' && err.code === 11000;
}
const GlobalErrorHandlers = (err, req, res, next) => {
    let ErrorSource = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Something went wrong';
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, zodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        ErrorSource = simplifiedError.errorSource;
    }
    else if (isValidationError(err)) {
        const simplifiedError = (0, mongooseError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        ErrorSource = simplifiedError.errorSource;
    }
    else if (isCastError(err)) {
        const simplifiedError = (0, castError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        ErrorSource = simplifiedError.errorSource;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
        ErrorSource = [
            {
                path: 'No path found',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    else if (isMongoError(err)) {
        const simplifiedError = (0, duplicateError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        ErrorSource = simplifiedError.errorSource;
    }
    res.status(statusCode).json({
        success: false,
        message,
        statusCode,
        stack: err.stack || 'No stack available',
        error: { details: err },
    });
};
exports.default = GlobalErrorHandlers;
