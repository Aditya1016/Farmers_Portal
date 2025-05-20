import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/', authorize, getAllUsers)
userRouter.get('/:id', (req, res) => res.send({message: 'Get all users'}))
userRouter.get('/', (req, res) => res.send({message: 'Get all users'}))

export default userRouter