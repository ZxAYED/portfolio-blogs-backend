"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({
    path: path_1.default.join(process.cwd(), '.env'),
});
exports.default = {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    gen_salt: process.env.GEN_SALT,
    secret: process.env.SECRET,
    cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
    cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
    accessToken_secret: process.env.ACCESS_TOKEN_SECRET,
    accessToken_expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    app_password: process.env.APP_PASSWORD,
    app_gmail: process.env.APP_GMAIL,
};
