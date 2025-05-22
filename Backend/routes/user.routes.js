import { Router } from "express";
import { getAllUsers, setLocation } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", authorize, getAllUsers);
userRouter.patch("/set-location", authorize, setLocation)

export default userRouter