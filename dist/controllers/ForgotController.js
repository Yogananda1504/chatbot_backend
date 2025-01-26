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
exports.forgotPassword = void 0;
const user_1 = require("../models/user");
const crypto_1 = __importDefault(require("crypto"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        console.log("email : ", email);
        const existingUser = yield user_1.user.findOne({ email });
        if (!existingUser || !existingUser.email) {
            return res.status(400).json({ error: "User does not exist or has no email" });
        }
        console.log("existingUser : ", existingUser);
        const resetToken = crypto_1.default.randomBytes(32).toString("hex");
        existingUser.resetPasswordToken = resetToken;
        existingUser.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour
        yield existingUser.save();
        console.log(process.env.EMAIL_USER);
        console.log(process.env.EMAIL_PASSWORD);
        const transporter = nodemailer_1.default.createTransport({
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
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log("Error sending email", err);
                return res.status(500).json({ error: "Error sending email" });
            }
            console.log("mail sent");
            res.status(200).json({ message: "Password reset email sent" });
        });
    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
exports.forgotPassword = forgotPassword;
