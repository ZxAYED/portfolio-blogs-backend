"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../user/user.controller");
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/register', user_controller_1.userController.createUser);
router.post('/login', auth_controller_1.authController.loginUser);
exports.authRouter = router;
