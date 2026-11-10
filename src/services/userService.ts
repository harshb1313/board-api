import argon2 from  "argon2"
import { db } from "../db/index.js";
import { users } from "../db/schema.js";
import { generateToken } from "../utils/token.js";


type RegisterUserInput = {
    name: string,
    email: string,
    password: string
}

type LogInUserInput = {
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


export async function logInService(input:LogInUserInput) {
    const user = await db.query.users.findFirst({where: (users, {eq}) => eq(users.email, input.email)});

    if(!user){
        throw new Error("Invalid email or password")
    }

    const isPasswordValid = await argon2.verify(user?.password_hash,input.password)
    if(!isPasswordValid){
        throw new Error("Invalid password")
    }

    const token = generateToken(user.email, user.password_hash)



    const { password_hash, ...safeUser } = user;
    return {user: safeUser, token};
}
