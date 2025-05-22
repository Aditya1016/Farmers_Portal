import mongoose, { Schema } from "mongoose";

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
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        },
        password: {
            type: String,
            required: [true, "Please add a password"],
            minLength: [6, "Password must be at least 6 characters long"],
        },
        location:{
            latitude:{
                type: Number
            },
            longitude: {
                type: Number
            }
        },
        socketId: {
            type: String
        }
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema)

export default User