import argon2 from  "argon2"
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { registerSchema } from "../schema/authSchema.js";



type RegisterUserInput = {
    name: string,
    email: string,
    password: string
}


export async function  registerUserService(input:RegisterUserInput) {
    const passwordHash = await argon2.hash(input.password)
    const [user] = await db.insert(users).values({name: input.name,
        email: input.email, password_hash: passwordHash
    }).returning({id: users.id, name:users.name, email: users.email, created_at: users.createdAt})

    return user    
}