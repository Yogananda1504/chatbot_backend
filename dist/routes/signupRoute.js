"use strict";
//  During the signup of the user we will be creating the user model in the backend 
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
const signupController_1 = require("../controllers/signupController");
const express_1 = require("express");
const signUpRouter = (0, express_1.Router)();
signUpRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, signupController_1.signUp)(req, res);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}));
exports.default = signUpRouter;
