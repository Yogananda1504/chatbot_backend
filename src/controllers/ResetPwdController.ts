import { Request, Response } from "express";
import { user } from "../models/user";
import bcrypt from "bcrypt";
import { transporter } from "../config/mailer";
import dotenv from 'dotenv';

dotenv.config();

export const resetPassword = async (req: Request, res: Response) => {
    try {
        const { token, password } = req.body;

        if (!token || !password) {
            return res.status(400).json({
                error: "Token and password are required"
            });
        }

        const userToReset = await user.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() },
        });

        if (!userToReset) {
            return res.status(400).json({
                error: "Password reset token is invalid or has expired",
            });
        }

        if (!userToReset.email) {
            return res.status(400).json({
                error: "User email not found",
            });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Update user's password and clear reset token fields
        userToReset.password = hashedPassword;
        userToReset.resetPasswordToken = undefined;
        userToReset.resetPasswordExpires = undefined;
        await userToReset.save();

        try {
            // Send confirmation email
            await transporter.sendMail({
                from: `"Password Reset" <${process.env.EMAIL_USER}>`,
                to: userToReset.email,
                subject: 'Password Reset Confirmation',
                text: `Hi ${userToReset.username},\n\nThis is a confirmation that the password for your account has been successfully changed.\n\nIf you did not request this change, please contact us immediately.`,
                html: `
                    <h1>Password Reset Confirmation</h1>
                    <p>Hi ${userToReset.username},</p>
                    <p>This is a confirmation that the password for your account has been successfully changed.</p>
                    <p>If you did not request this change, please contact us immediately.</p>
                `
            });
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            // Continue with password reset even if email fails
        }

        res.status(200).json({
            message: "Password has been reset successfully",
        });
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({
            error: "Server error while resetting password",
        });
    }
};
