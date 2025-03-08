"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const msg = match && match[1];
    const errorSource = [
        {
            path: 'No path found',
            message: `${msg} is already exists`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: `${msg} is already exits` || 'Duplicate entry found',
        errorSource,
    };
};
exports.default = handleDuplicateError;
