import { z } from 'zod';



const createUserValidationSchema = z.object({
    name: z.string()
        .min(3, "Name must be at least 3 characters long")
        .max(50, "Name must be at most 50 characters long"),
    email: z.string()
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address"), password: z.string()
            .regex(/^[a-zA-Z0-9!@#$%^&*]{6,}$/
                , "Password must contain at least 6 characters, including letters, numbers, and symbols"),
    role: z.enum(["admin", "user"]),

    isBlocked: z.boolean().default(false)
});

const updateUserValidationSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long").max(50, "Name must be at most 50 characters long").optional(), email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email address").optional(),
    password: z.string().regex(/^[a-zA-Z0-9!@#$%^&*]{6,}$/
        , "Password must contain at least 6 characters, including letters, numbers, and symbols").optional(),
    role: z.enum(["admin", "user"]).optional(),
    status: z.enum(["active", "blocked"]).optional(),
    isBlocked: z.boolean().default(false).optional(),

})
export const userValidationSchema = {
    createUserValidationSchema, updateUserValidationSchema
}