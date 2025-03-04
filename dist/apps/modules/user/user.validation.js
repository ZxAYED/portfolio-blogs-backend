"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, 'Name must be at least 3 characters long')
        .max(50, 'Name must be at most 50 characters long'),
    email: zod_1.z
        .string()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address'),
    password: zod_1.z
        .string()
        .regex(/^[a-zA-Z0-9!@#$%^&*]{6,}$/, 'Password must contain at least 6 characters, including letters, numbers, and symbols'),
    role: zod_1.z.enum(['admin', 'user']),
    isBlocked: zod_1.z.boolean().default(false),
});
const updateUserValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, 'Name must be at least 3 characters long')
        .max(50, 'Name must be at most 50 characters long')
        .optional(),
    email: zod_1.z
        .string()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address')
        .optional(),
    password: zod_1.z
        .string()
        .regex(/^[a-zA-Z0-9!@#$%^&*]{6,}$/, 'Password must contain at least 6 characters, including letters, numbers, and symbols')
        .optional(),
    role: zod_1.z.enum(['admin', 'user']).optional(),
    status: zod_1.z.enum(['active', 'blocked']).optional(),
    isBlocked: zod_1.z.boolean().default(false).optional(),
});
exports.userValidationSchema = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
