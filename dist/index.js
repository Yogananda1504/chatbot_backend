"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const passport_1 = __importDefault(require("./config/passport"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const signupRoute_1 = __importDefault(require("./routes/signupRoute"));
const signinRoute_1 = __importDefault(require("./routes/signinRoute"));
const forgotPassword_1 = __importDefault(require("./routes/forgotPassword"));
const resetPassword_1 = __importDefault(require("./routes/resetPassword"));
const signOut_1 = __importDefault(require("./routes/signOut"));
const chatRoutes_1 = __importDefault(require("./routes/chatRoutes"));
const connectToDB_1 = __importDefault(require("./config/connectToDB"));
const PORT = 3000;
(0, connectToDB_1.default)();
const frontendUrl = process.env.CLIENT_URL;
console.log(frontendUrl);
app.use((0, cors_1.default)({
    origin: `${frontendUrl}`,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(passport_1.default.initialize());
app.use("/signup", signupRoute_1.default);
app.use("/signin", signinRoute_1.default);
app.use("/forgot", forgotPassword_1.default);
app.use("/reset", resetPassword_1.default);
app.use("/chat", passport_1.default.authenticate('jwt', { session: false }), chatRoutes_1.default);
app.use("/signout", signOut_1.default);
// We will use the passport middleware to authenticate requests for the protected routes
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
