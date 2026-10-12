import { Router } from "express";
import { registerUser } from "../controller/userController.js";


const route = Router()


route.post("/create/user", registerUser)



export default route;