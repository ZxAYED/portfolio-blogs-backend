"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogValidation = void 0;
const zod_1 = require("zod");
const createBlogSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .min(1, 'Title is required')
        .max(100, 'Title must be less than 100 characters'),
    content: zod_1.z.string().min(1, 'Content is required'),
});
const updateBlogSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .max(100, 'Title must be less than 100 characters')
        .optional(),
    content: zod_1.z.string().optional(),
});
exports.blogValidation = { updateBlogSchema, createBlogSchema };
