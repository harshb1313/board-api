import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { registerSchema } from "../schema/authSchema.js";
import { registerUserService } from "../services/userService.js";


export async function registerUser(req:Request, res:Response, next: NextFunction){
    try {
        const input = registerSchema.parse(req.body);
        const user = await registerUserService(input);
        return res.status(201).json({user})
    } catch (error) {
        if (error instanceof ZodError){
            return res.status(400).json({
                error:"Invalid registration data",
                details:error.issues,
            })
        }
        return next(error);
    }
}
