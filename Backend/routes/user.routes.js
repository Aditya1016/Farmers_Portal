import { Router } from "express";
import { userSignUp, userSignIn, userLogout, getUserProfile } from "../controllers/user.controller.js";
import {authorize} from "../middlewares/auth.middleware.js";
import { setUserLocation } from "../controllers/location.controller.js";

const userRouter = Router();

userRouter.post('/sign-up', userSignUp);
userRouter.post('/sign-in', userSignIn);
userRouter.post('/sign-out', authorize, userLogout);

userRouter.get('/profile', authorize, getUserProfile)

userRouter.patch('/set-location', authorize, setUserLocation);

export default userRouter;