import { z } from 'zod'

const createBlogSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  content: z.string().min(1, 'Content is required'),
})

const updateBlogSchema = z.object({
  title: z
    .string()
    .max(100, 'Title must be less than 100 characters')
    .optional(),
  content: z.string().optional(),
})

export const blogValidation = { updateBlogSchema, createBlogSchema }
