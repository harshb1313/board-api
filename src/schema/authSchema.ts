import z from "zod";

export const registerSchema = z.object({
name: z.string().trim().min(1, "Name is required").max(50),
email: z.email("Invalid email address"),
password: z.string().min(8, "Password must be atleast 8 characters")
})

