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
Object.defineProperty(exports, "__esModule", { value: true });
const chatController_1 = require("../controllers/chatController");
const express_1 = require("express");
const chatRouter = (0, express_1.Router)();
const chatController = new chatController_1.ChatController();
chatRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield chatController.handleChat(req, res);
    }
    catch (error) {
        console.error('Error handling chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
exports.default = chatRouter;
