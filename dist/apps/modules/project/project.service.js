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
exports.ProjectService = void 0;
const UploadImageToCloudinary_1 = __importDefault(require("../../utils/UploadImageToCloudinary"));
const project_model_1 = __importDefault(require("./project.model"));
const createProjectIntoDb = (file, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (file) {
        const imageName = `${payload === null || payload === void 0 ? void 0 : payload.projectName}+${Date.now()}`;
        const path = file === null || file === void 0 ? void 0 : file.buffer;
        const uploadResponse = yield (0, UploadImageToCloudinary_1.default)(imageName, path);
        payload.imageUrl = uploadResponse.url;
    }
    const result = yield project_model_1.default.create(payload);
    return result;
});
const getAllProjectsFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.default.find();
    return result;
});
const getSingleProjectsFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.default.findById(id);
    return result;
});
const updateProjectsFromDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteProjectsFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.ProjectService = {
    createProjectIntoDb,
    getAllProjectsFromDb,
    getSingleProjectsFromDb,
    updateProjectsFromDb,
    deleteProjectsFromDb,
};
