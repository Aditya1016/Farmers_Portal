import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY
} from "../config/env.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      trim: true,
      minLength: [3, "Name must be at least 3 characters long"],
      maxLength: [50, "Name can be at most 50 characters long"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minLength: [6, "Password must be at least 6 characters long"],
    },
    phoneNumber: {
      type: String, 
    },
    location: {
      latitude: Number,
      longitude: Number,
    },
    socketId: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "merchant"],
      default: "user",
    },
  },
  { timestamps: true }
);

// Common token generation
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    REFRESH_TOKEN_SECRET,
    {
      expiresIn: REFRESH_TOKEN_EXPIRY,
    }
  );
};

const User = mongoose.model("User", userSchema);
export default User;
