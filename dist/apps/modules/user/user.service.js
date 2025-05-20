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
exports.userService = void 0;
const user_model_1 = require("./user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../Errorhandlers/AppError"));
const loginUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const email = data.email.toLowerCase();
    const userData = yield user_model_1.userModel.findOne({ email });
    if (!userData) {
        throw new AppError_1.default(404, "User not found!");
    }
    if (data.password !== userData.password) {
        throw new AppError_1.default(403, "You have given a wrong password!");
    }
    const tokenPayload = {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        image: userData.image,
    };
    const accessToken = jsonwebtoken_1.default.sign(tokenPayload, config_1.default.accessToken_secret, { expiresIn: Number(config_1.default.accessToken_expiresIn) });
    return {
        accessToken
    };
});
const createUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.create(payload);
    return result;
});
const deleteUserIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.findByIdAndDelete(payload);
    return result;
});
const contactIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.contactModel.create(payload);
    return result;
});
const contactDeleteIntoDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.contactModel.findByIdAndDelete(payload);
    return result;
});
const getAllUsersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.userModel.find();
    return result;
});
const getAllContactFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.contactModel.find();
    return result;
});
exports.userService = {
    createUserIntoDb, contactIntoDb, deleteUserIntoDb,
    getAllUsersFromDb, contactDeleteIntoDb, getAllContactFromDb, loginUser
};
