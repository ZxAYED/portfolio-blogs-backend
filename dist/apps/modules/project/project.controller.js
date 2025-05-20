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
exports.projectController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const project_service_1 = require("./project.service");
const createProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("ei page a ashei na controller");
    const result = yield project_service_1.ProjectService.createProjectIntoDb(req.file, req.body);
    console.log("🚀 ~ createProject controller ~ result:", req.file, req.body);
    res.json({
        success: true,
        message: 'Project created successfully',
        statusCode: 201,
        data: result,
    });
}));
const getAllProjects = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_service_1.ProjectService.getAllProjectsFromDb();
    res.json({
        success: true,
        message: 'Projects are retrieved successfully',
        statusCode: 200,
        data: result,
    });
}));
const getSingleProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_service_1.ProjectService.getSingleProjectFromDb(req.params.id);
    res.json({
        success: true,
        message: 'Project retrieved successfully',
        statusCode: 200,
        data: result,
    });
}));
const updateProjects = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_service_1.ProjectService.updateProjectsFromDb(req.params.id, req.body);
    res.json({
        success: true,
        message: 'Project updated successfully',
        statusCode: 200,
        data: result,
    });
}));
const deleteProject = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield project_service_1.ProjectService.deleteProjectsFromDb(req.params.id);
    res.json({
        success: true,
        message: 'Project Deleted successfully',
        statusCode: 200,
        data: result,
    });
}));
exports.projectController = {
    createProject,
    getAllProjects,
    getSingleProject,
    updateProjects,
    deleteProject,
};
