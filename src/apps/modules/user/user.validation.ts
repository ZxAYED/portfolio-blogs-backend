import { z } from 'zod'

const createUserValidationSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name must be at most 50 characters long'),
  email: z
    .string()
  ,
  image: z
    .string()

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
  image: z
    .string()

    .optional(),

})
export const userValidationSchema = {
  createUserValidationSchema,
  updateUserValidationSchema,
}
