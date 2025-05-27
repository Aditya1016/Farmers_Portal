import { Router } from "express";
import { getUserProfile, merchantLogout, merchantSignIn, merchantSignUp } from "../controllers/user.controller.js";
import { authorize } from "../middlewares/auth.middleware.js";
import { setUserLocation } from "../controllers/location.controller.js";

const merchantRouter = Router();

merchantRouter.post('/sign-up', merchantSignUp);
merchantRouter.post('/sign-in', merchantSignIn);
merchantRouter.post('/sign-out', authorize, merchantLogout);

merchantRouter.get('/profile', authorize, getUserProfile);

merchantRouter.patch('/set-location', authorize, setUserLocation);

export default merchantRouter;