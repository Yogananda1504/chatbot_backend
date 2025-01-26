import { resetPassword } from "../controllers/ResetPwdController";
import { Router, Request, Response } from "express";

const resetRouter: Router = Router();

resetRouter.post("/", async (req: Request, res: Response) => {
    console.log("Restting password");
    try {
        await resetPassword(req, res);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

export default resetRouter;
