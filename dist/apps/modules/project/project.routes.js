"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const AppError_1 = __importDefault(require("../../Errorhandlers/AppError"));
const multer_config_1 = __importDefault(require("../../utils/multer.config"));
const project_controller_1 = require("./project.controller");
const project_validation_1 = require("./project.validation");
const router = express_1.default.Router();
router.post('/', multer_config_1.default.single('imageUrl'), (req, res, next) => {
    if (!req.body || !req.file) {
        return next(new AppError_1.default(400, 'Missing required fields or file'));
    }
    req.body.imageUrl = req.file;
    next();
}, (0, validateRequest_1.default)(project_validation_1.projectValidation.createProjectSchema), project_controller_1.projectController.createProject);
router.get('/', project_controller_1.projectController.getAllProjects);
router.get('/:id', project_controller_1.projectController.getSingleProjects);
router.patch('/:id', multer_config_1.default.single('imageUrl'), (req, res, next) => {
    if (!req.body || !req.file) {
        return next(new AppError_1.default(400, 'Missing required fields or file'));
    }
    req.body.imageUrl = req.file;
    next();
}, (0, validateRequest_1.default)(project_validation_1.projectValidation.updateProjectSchema), project_controller_1.projectController.updateProjects);
router.delete('/:id', project_controller_1.projectController.deleteProject);
exports.ProjectRoutes = router;
