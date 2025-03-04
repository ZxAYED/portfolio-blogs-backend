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
exports.adminService = void 0;
const AppError_1 = __importDefault(require("../../Errorhandlers/AppError"));
const blog_model_1 = require("../blog/blog.model");
const user_model_1 = require("../user/user.model");
const createAdminFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.userModel.findById(payload);
    if (!isUserExists) {
        throw new AppError_1.default(404, 'User not found');
    }
    if (!isUserExists) {
        throw new AppError_1.default(404, 'User not found');
    }
    const result = yield user_model_1.userModel.findByIdAndUpdate(payload, { role: 'admin' }, { new: true, runValidators: true });
    return result;
});
const blockUserFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExists = yield user_model_1.userModel.findById(payload);
    if (!isUserExists) {
        throw new AppError_1.default(404, 'User not found');
    }
    if (isUserExists.isBlocked) {
        throw new AppError_1.default(404, 'User not found');
    }
    const result = yield user_model_1.userModel.findByIdAndUpdate(payload, { isBlocked: true }, { new: true, runValidators: true });
    return result;
});
const deleteblogsFromDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isBlogExists = yield blog_model_1.blogModel.findById(payload);
    if (!isBlogExists) {
        throw new AppError_1.default(404, 'Blog not found');
    }
    if (!isBlogExists.isPublished) {
        throw new AppError_1.default(404, 'Blog not found');
    }
    yield blog_model_1.blogModel.findByIdAndDelete(payload);
    return {
        acknowledged: true,
        deletedCount: 1,
    };
});
exports.adminService = {
    createAdminFromDb,
    blockUserFromDb,
    deleteblogsFromDb,
};
