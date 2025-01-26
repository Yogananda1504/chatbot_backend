//  During the signup of the user we will be creating the user model in the backend 

import { signUp } from "../controllers/signupController";
import { Router, Request, Response } from "express";
const signUpRouter: Router = Router();

signUpRouter.post("/", async (req: Request, res: Response) => {
    try {
        await signUp(req, res);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default signUpRouter;