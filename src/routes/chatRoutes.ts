import { ChatController } from "../controllers/chatController";
import { Router, Request, Response } from "express";

const chatRouter: Router = Router();
const chatController = new ChatController();
chatRouter.post("/", async (req: Request, res: Response) => {
    try {
        await chatController.handleChat(req, res);
    } catch (error) {
        console.error('Error handling chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default chatRouter;
