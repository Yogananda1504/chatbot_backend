import OpenAI from "openai";
import { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export class ChatController {
    private client: OpenAI;
    private modelName: string = "gpt-4o";

    constructor() {
        
        
        this.client = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: process.env.api_endpoint
        });
    }

    public async handleChat(req: Request, res: Response) {
        try {
            const { message } = req.body;

            if (!message) {
                return res.status(400).json({
                    success: false,
                    error: 'Message is required'
                });
            }

            const response = await this.client.chat.completions.create({
                messages: [
                    { role: "system", content: "You are a helpful assistant." },
                    { role: "user", content: message }
                ],
                temperature: 1.0,
                top_p: 1.0,
                max_tokens: 1000,
                model: this.modelName
            });

            return res.status(200).json({
                success: true,
                data: response.choices[0].message.content
            });

        } catch (error) {
            console.error('Chat error:', error);
            return res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
}

export const chatController = new ChatController();