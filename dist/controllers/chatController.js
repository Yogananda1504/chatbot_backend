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
exports.chatController = exports.ChatController = void 0;
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class ChatController {
    constructor() {
        this.modelName = "gpt-4o";
        this.client = new openai_1.default({
            apiKey: process.env.OPENAI_API_KEY,
            baseURL: process.env.api_endpoint
        });
    }
    handleChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { message } = req.body;
                if (!message) {
                    return res.status(400).json({
                        success: false,
                        error: 'Message is required'
                    });
                }
                const response = yield this.client.chat.completions.create({
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
            }
            catch (error) {
                console.error('Chat error:', error);
                return res.status(500).json({
                    success: false,
                    error: 'Internal server error'
                });
            }
        });
    }
}
exports.ChatController = ChatController;
exports.chatController = new ChatController();
