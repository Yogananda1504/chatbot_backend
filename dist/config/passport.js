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
// src/passport/jwtStrategy.ts
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const SECRET_KEY = 'secret';
// Custom function to extract the JWT from a cookie named 'jwt'
function cookieExtractor(req) {
    if (req && req.cookies) {
        return req.cookies['jwt'] || null;
    }
    return null;
}
// Configure Passport to use the JWT strategy
const options = {
    // We use a custom extractor to read the JWT from the cookie
    jwtFromRequest: cookieExtractor,
    secretOrKey: SECRET_KEY,
};
passport_1.default.use(new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (payload) {
            const user = { email: payload.email, username: payload.username };
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    }
    catch (error) {
        return done(error, false);
    }
})));
exports.default = passport_1.default;
