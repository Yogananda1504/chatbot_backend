import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email:String,
    password:String,
    resetPasswordToken:String,
    resetPasswordExpires:Date,
})

export const user = mongoose.model("user", userSchema);