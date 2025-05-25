import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const authorize = async(req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
    
        if (!token) {
            return res.status(401).json({ message: "Access token is required" });       
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        
        req.user = user;
        next();
    } catch (error) {
        const err = new Error(error?.message || "Invalid access token");
        err.statusCode = 401;
        next(err);
    }
}