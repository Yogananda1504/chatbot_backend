import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { user } from "../models/user";

export const signUp = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const username = req.body.name;

        // Check if email already exists
        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new user({    
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        console.log(newUser);
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Server error" });
    }
};
