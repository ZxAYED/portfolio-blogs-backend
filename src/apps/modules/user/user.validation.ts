import { z } from 'zod'

const createUserValidationSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long'),
  email: z
    .string()
  ,
  password: z
    .string()
    .regex(
      /^[a-zA-Z0-9!@#$%^&*]{6,}$/,
      'Password must contain at least 6 characters, including letters, numbers, and symbols',
    ),
  role: z.string().optional(),

  isBlocked: z.boolean().default(false),
})

const updateUserValidationSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long')
    .optional(),
  email: z
    .string()

    .optional(),
  password: z
    .string()
    .regex(
      /^[a-zA-Z0-9!@#$%^&*]{6,}$/,
      'Password must contain at least 6 characters, including letters, numbers, and symbols',
    )
    .optional(),
  role: z.string().optional(),
  status: z.enum(['active', 'blocked']).default('active').optional(),
  isBlocked: z.boolean().default(false).optional(),
})
export const userValidationSchema = {
  createUserValidationSchema,
  updateUserValidationSchema,
}
