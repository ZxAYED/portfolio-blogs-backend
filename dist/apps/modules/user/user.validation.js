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
        .string(),
    image: zod_1.z
        .string()
});
const updateUserValidationSchema = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(3, 'Name must be at least 3 characters long')
        .max(50, 'Name must be at most 50 characters long')
        .optional(),
    email: zod_1.z
        .string()
        .optional(),
    image: zod_1.z
        .string()
        .optional(),
});
exports.userValidationSchema = {
    createUserValidationSchema,
    updateUserValidationSchema,
};
