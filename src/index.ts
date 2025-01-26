import express from "express"
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
const app = express()
import passport from "./config/passport";
import cookieParser from 'cookie-parser';
import signUpRouter from "./routes/signupRoute";
import signInRouter from "./routes/signinRoute";
import forgotRouter from "./routes/forgotPassword";
import resetRouter from "./routes/resetPassword";
import signOutRouter from "./routes/signOut";
import chatRouter from "./routes/chatRoutes";
import connectToDB from "./config/connectToDB";
const PORT = 3000;
connectToDB();
const frontendUrl  = process.env.CLIENT_URL;
console.log(frontendUrl)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://chatbot-vynr.netlify.app'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); 
    res.setHeader('Access-Control-Allow-Credentials', 'true'); 
    next();
  });

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use("/signup", signUpRouter);
app.use("/signin", signInRouter);
app.use("/forgot", forgotRouter);
app.use("/reset", resetRouter);
app.use("/chat", passport.authenticate('jwt', { session: false }), chatRouter);
app.use("/signout",signOutRouter)

// We will use the passport middleware to authenticate requests for the protected routes

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});