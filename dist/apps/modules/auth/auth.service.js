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
exports.authService = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../Errorhandlers/AppError"));
const user_model_1 = require("../user/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const loginUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.userModel.findOne({ email: payload.email });
    if (!isUserExists) {
        throw new AppError_1.default(404, 'User not found');
    }
    if (isUserExists.isBlocked) {
        throw new AppError_1.default(404, 'User not found');
    }
    const isPasswordMactched = yield bcryptjs_1.default.compare(payload.password, isUserExists.password);
    if (!isPasswordMactched) {
        throw new AppError_1.default(401, 'Wrong Password');
    }
    const jwtPayload = {
        userEmail: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.email,
        role: isUserExists === null || isUserExists === void 0 ? void 0 : isUserExists.role,
    };
    const token = jsonwebtoken_1.default.sign({
        data: jwtPayload,
    }, config_1.default.secret, { expiresIn: 60 * 60 });
    return {
        token,
    };
});
exports.authService = {
    loginUserIntoDb,
};
