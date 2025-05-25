import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authorize = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if (!token) {
            throw new Error("Unauthorised request")
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            throw new Error("Invalid Access token")
        }
        
        req.user = user;
        next();
    } catch (error) {
        const err = new Error(error?.message || "Invalid access token");
        err.statusCode = 401;
        next(err);
    }
}