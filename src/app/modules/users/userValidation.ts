import {z} from 'zod';

const userValidationSchema = z.object({
    name: z.string({
        required_error: "Name is required and should be string",
    }).min(2).max(50),
    email: z.string({
        required_error: "Email is required and should be string",
    }).email(),
    password: z.string({
        required_error: "Password is required and should be string",
    }),
})

export const userValidations = {
    userValidationSchema,
}