import { signIn } from "../controllers/signInController";
import { Router, Request, Response } from "express";
const signInRouter: Router = Router();

signInRouter.post("/", async (req: Request, res: Response) => {
    try {
        await signIn(req, res);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default signInRouter;