"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const signOutRouter = (0, express_1.Router)();
signOutRouter.post('/', (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({ message: 'Successfully signed out' });
    }
    catch (error) {
        console.log('Error signing out:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = signOutRouter;
