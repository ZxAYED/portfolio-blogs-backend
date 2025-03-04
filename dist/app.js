"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./apps/modules/user/user.routes");
const globalErrorHandlers_1 = __importDefault(require("./apps/Errorhandlers/globalErrorHandlers"));
const auth_routes_1 = require("./apps/modules/auth/auth.routes");
const blog_routes_1 = require("./apps/modules/blog/blog.routes");
const notFound_1 = __importDefault(require("./apps/Errorhandlers/notFound"));
const admin_routes_1 = require("./apps/modules/admin/admin.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/auth', auth_routes_1.authRouter);
app.use('/api/user', user_routes_1.userRouter);
app.use('/api/blogs', blog_routes_1.blogRoutes);
app.use('/api/admin', admin_routes_1.adminRouter);
app.get('/', (req, res) => {
    res.send(' Why are u running? SO you are gay ? Then WHOs gay');
});
app.use(notFound_1.default);
app.use(globalErrorHandlers_1.default);
exports.default = app;
// https://echoes-of-the-mind.vercel.app/
