"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleWares/auth"));
const blog_controller_1 = require("./blog.controller");
const validateRequest_1 = __importDefault(require("../../middleWares/validateRequest"));
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(blog_validation_1.blogValidation.createBlogSchema), (0, auth_1.default)('user', 'admin'), blog_controller_1.blogController.createBlog);
router.get('/', blog_controller_1.blogController.getAllBlogs);
router.patch('/:id', (0, auth_1.default)('user', 'admin'), (0, validateRequest_1.default)(blog_validation_1.blogValidation.updateBlogSchema), blog_controller_1.blogController.updateblogs);
router.delete('/:id', (0, auth_1.default)('user', 'admin'), blog_controller_1.blogController.deleteblog);
exports.blogRoutes = router;
