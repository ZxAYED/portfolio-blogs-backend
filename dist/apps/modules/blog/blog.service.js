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
const UploadImageToCloudinary_1 = __importDefault(require("../../utils/UploadImageToCloudinary"));
const blog_model_1 = require("./blog.model");
const createBlogIntoDb = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const imageName = `${payload === null || payload === void 0 ? void 0 : payload.title}+${Date.now()}`;
        const path = file === null || file === void 0 ? void 0 : file.buffer;
        const uploadResponse = yield (0, UploadImageToCloudinary_1.default)(imageName, path);
        payload.imageUrl = uploadResponse.url;
    }
    const result = yield blog_model_1.blogModel.create(payload);
    return result;
});
const getAllBlogsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.blogModel.find();
    return result;
});
const getSingleBlogsFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.blogModel.findById(id);
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
    updateblogsFromDb, getSingleBlogsFromDb,
    deleteblogsFromDb,
};
