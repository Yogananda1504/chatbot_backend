"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const mailer_1 = require("../config/mailer");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { token, password } = req.body;
        if (!token || !password) {
            return res.status(400).json({
                error: "Token and password are required"
            });
        }
        const userToReset = yield user_1.user.findOne({
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
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        // Update user's password and clear reset token fields
        userToReset.password = hashedPassword;
        userToReset.resetPasswordToken = undefined;
        userToReset.resetPasswordExpires = undefined;
        yield userToReset.save();
        try {
            // Send confirmation email
            yield mailer_1.transporter.sendMail({
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
        }
        catch (emailError) {
            console.error('Email sending error:', emailError);
            // Continue with password reset even if email fails
        }
        res.status(200).json({
            message: "Password has been reset successfully",
        });
    }
    catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({
            error: "Server error while resetting password",
        });
    }
});
exports.resetPassword = resetPassword;
