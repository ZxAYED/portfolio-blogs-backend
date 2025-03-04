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
exports.blogService = void 0;
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../Errorhandlers/AppError"));
const QueryBuilder_1 = __importDefault(require("../../middleWares/QueryBuilder"));
const user_model_1 = require("../user/user.model");
const blog_model_1 = require("./blog.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createBlogIntoDb = (tokens, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const token = tokens.split(' ')[1];
    const data = jsonwebtoken_1.default.verify(token, config_1.default.secret);
    const { userEmail } = data.data;
    const isUserExists = yield user_model_1.userModel.findOne({ email: userEmail });
    if (!isUserExists) {
        throw new AppError_1.default(400, 'User not found');
    }
    if (isUserExists.isBlocked) {
        throw new AppError_1.default(400, 'User not found');
    }
    if (typeof payload.content !== 'string') {
        throw new AppError_1.default(400, ' Content must be  string ');
    }
    payload.author = isUserExists._id;
    const result = yield blog_model_1.blogModel.create(payload);
    return result;
});
const getAllBlogsFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // filter sort search
    const searchableFields = ['title', 'content'];
    const blogsQuery = new QueryBuilder_1.default(blog_model_1.blogModel.find().populate('author'), query)
        .search(searchableFields)
        .filter()
        .sort()
        .pagination();
    const result = yield blogsQuery.QueryModel;
    return result;
});
const updateblogsFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.blogModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteblogsFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.blogModel.deleteOne({ _id: id });
    return result;
});
exports.blogService = {
    createBlogIntoDb,
    getAllBlogsFromDb,
    updateblogsFromDb,
    deleteblogsFromDb,
};
