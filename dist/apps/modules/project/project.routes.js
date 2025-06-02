"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const AppError_1 = __importDefault(require("../../Errorhandlers/AppError"));
const multer_config_1 = __importDefault(require("../../utils/multer.config"));
const project_controller_1 = require("./project.controller");
const project_validation_1 = require("./project.validation");
const router = express_1.default.Router();
router.post('/', multer_config_1.default.single('file'), (req, res, next) => {
    const parsedData = JSON.parse(req.body.data);
    req.body = project_validation_1.projectValidation.createProjectSchema.parse(parsedData);
    return project_controller_1.projectController.createProject(req, res, next);
});
router.get('/', project_controller_1.projectController.getAllProjects);
router.get('/:id', project_controller_1.projectController.getSingleProject);
router.patch('/:id', multer_config_1.default.single('file'), (req, res, next) => {
    if (!req.body || !req.file) {
        return next(new AppError_1.default(400, 'Missing required fields or file'));
    }
    const parsedData = JSON.parse(req.body.data);
    req.body = project_validation_1.projectValidation.createProjectSchema.parse(parsedData);
    next();
}, project_controller_1.projectController.updateProjects);
router.delete('/:id', project_controller_1.projectController.deleteProject);
exports.ProjectRoutes = router;
