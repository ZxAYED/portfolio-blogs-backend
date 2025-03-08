"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandlers_1 = __importDefault(require("./apps/Errorhandlers/globalErrorHandlers"));
const notFound_1 = __importDefault(require("./apps/Errorhandlers/notFound"));
const blog_routes_1 = require("./apps/modules/blog/blog.routes");
const project_routes_1 = require("./apps/modules/project/project.routes");
const user_routes_1 = require("./apps/modules/user/user.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: ['http://localhost:3000', 'https://next-portfolio-personal-blog-frontend.vercel.app/']
}));
app.use(express_1.default.json());
app.use('/api/user', user_routes_1.userRouter);
app.use('/api/blogs', blog_routes_1.blogRoutes);
app.use('/api/projects', project_routes_1.ProjectRoutes);
app.get('/', (req, res) => {
    res.send(' Why are u running? SO you are gay ? Then WHOs gay');
});
app.use(notFound_1.default);
app.use(globalErrorHandlers_1.default);
exports.default = app;
