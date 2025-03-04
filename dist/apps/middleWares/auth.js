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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = __importDefault(require("../Errorhandlers/AppError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const config_1 = __importDefault(require("../config"));
const user_model_1 = require("../modules/user/user.model");
const auth = (...requiredRoles) => {
    // e.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token) {
            throw new AppError_1.default(401, 'You are not Authorized');
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.default.secret);
        const userEmail = (_c = decoded.data) === null || _c === void 0 ? void 0 : _c.userEmail;
        const role = (_d = decoded.data) === null || _d === void 0 ? void 0 : _d.role;
        const isUserExists = yield user_model_1.userModel.findOne({ email: userEmail });
        if (!isUserExists) {
            throw new AppError_1.default(400, 'User not found');
        }
        if (isUserExists.isBlocked) {
            throw new AppError_1.default(400, 'User is blocked');
        }
        if (requiredRoles && !requiredRoles.includes(role)) {
            throw new AppError_1.default(401, 'You are not Authorized');
        }
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
