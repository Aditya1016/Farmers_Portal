import { Router } from "express";
import { setUserLocation, userLogout, userSignIn, userSignUp, getUserProfile } from "../controllers/user.controller.js";
import {authorize} from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.post('/sign-up', userSignUp);
userRouter.post('/sign-in', userSignIn);
userRouter.post('/sign-out', userLogout)

userRouter.patch("/set-location", authorize, setUserLocation)
userRouter.get('/profile', authorize, getUserProfile);

export default userRouter