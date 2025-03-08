"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
router.post('/', user_controller_1.userController.createUser);
router.post('/contact', user_controller_1.userController.createContact);
router.get('/', user_controller_1.userController.getAllUser);
router.get('/contact', user_controller_1.userController.getAllContact);
router.delete('/contact/:id', user_controller_1.userController.deleteContact);
router.delete('/:id', user_controller_1.userController.deleteUser);
exports.userRouter = router;
