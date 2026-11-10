import { Router } from "express";
import { LoginUser, registerUser } from "../controller/userController.js";


const route = Router()


route.post("/create/user", registerUser)
route.post("/login/user", LoginUser)



export default route;