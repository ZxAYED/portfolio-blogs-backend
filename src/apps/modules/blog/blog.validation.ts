import { z } from 'zod'

const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  content: z.string(),
  author: z.string(),
  isPublished: z.boolean().default(true),
})

const updateBlogSchema = z.object({
  title: z
    .string()
    .max(100, 'Title must be less than 100 characters')
    .optional(),
  content: z.string().optional(),
  author: z.string().optional(),
  isPublished: z.boolean().default(true),
})

export const blogValidation = { updateBlogSchema, createBlogSchema }
