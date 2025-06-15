"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const AppError_1 = __importDefault(require("../../Errorhandlers/AppError"));
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const multer_config_1 = __importDefault(require("../../utils/multer.config"));
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.post('/', multer_config_1.default.single('file'), (req, res, next) => {
    if (!req.body || !req.file) {
        return next(new AppError_1.default(400, 'Missing required fields or file'));
    }
    const parsedData = JSON.parse(req.body.data);
    req.body = blog_validation_1.blogValidation.createBlogSchema.parse(parsedData),
        req.body.imageUrl = req.file;
    next();
}, blog_controller_1.blogController.createBlog);
router.get('/', blog_controller_1.blogController.getAllBlogs);
router.get('/:id', blog_controller_1.blogController.getSingleBlog);
router.patch('/:id', (0, validateRequest_1.default)(blog_validation_1.blogValidation.updateBlogSchema), blog_controller_1.blogController.updateblogs);
router.delete('/:id', blog_controller_1.blogController.deleteblog);
exports.blogRoutes = router;
