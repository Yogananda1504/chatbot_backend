import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { user } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signIn = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const existingUser = await user.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const isPasswordValid = await bcrypt.compare(password, existingUser.password!);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid Password" });
        }
        // If the user is found and the password is correct, generate a JWT token
        const token = jwt.sign({ username:existingUser.email,email: existingUser.email }, process.env.JWT_SECRET!);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        });
        res.status(200).json({ message: "Sign in successful" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
