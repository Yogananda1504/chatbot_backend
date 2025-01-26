import { forgotPassword } from "../controllers/ForgotController";
import { Router, Request, Response } from "express";
const forgotRouter: Router = Router();

forgotRouter.post("/", async (req: Request, res: Response) => {
    try {
        await forgotPassword(req, res);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default forgotRouter;