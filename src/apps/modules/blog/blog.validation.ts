import { z } from "zod";


const createBlogSchema = z.object({
    title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
    content: z.string().min(1, 'Content is required'),
    author: z.string().refine(val => /^[a-f\d]{24}$/i.test(val), 'Author must be a valid ObjectId'),
    isPublished: z.boolean().default(true)
});

const updateBlogSchema = z.object({
    title: z.string().max(100, 'Title must be less than 100 characters').optional(),
    content: z.string().optional(),
    author: z.string().refine(val => /^[a-f\d]{24}$/i.test(val), 'Author must be a valid ObjectId').optional(),
    isPublished: z.boolean().optional()
});

export const blogValidation = { updateBlogSchema, createBlogSchema };
