import { Request, Response } from "express";
import { user } from "../models/user";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv"
dotenv.config()

export const forgotPassword = async (req: Request, res: Response) => {
	try {
		const { email } = req.body;
		console.log("email : ",email);
		const existingUser = await user.findOne({ email });
		if (!existingUser || !existingUser.email) {
			return res.status(400).json({ error: "User does not exist or has no email" });
		}
		console.log("existingUser : ",existingUser);

		const resetToken = crypto.randomBytes(32).toString("hex");
		existingUser.resetPasswordToken = resetToken;
		existingUser.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
		await existingUser.save();
		console.log(process.env.EMAIL_USER)
		console.log(process.env.EMAIL_PASSWORD)

		const transporter = nodemailer.createTransport({
			service: "Gmail",
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		const mailOptions = {
			to: existingUser.email,
			from: process.env.EMAIL_USER,
			subject: "Password Reset",
			text: `You are receiving this because you (or someone else) have requested to reset your account password.\n\n
Please click on the following link, or paste it into your browser to complete the process:\n\n
${resetToken}\n\n
If you did not request this, please ignore this email.\n`,
		};

		transporter.sendMail(mailOptions, (err: any) => {
			if (err) {
				console.log("Error sending email", err);
				return res.status(500).json({ error: "Error sending email" });
			}
			console.log("mail sent")
			res.status(200).json({ message: "Password reset email sent" });
		});
	} catch (error) {
		res.status(500).json({ error: "Server error" });
	}
};
