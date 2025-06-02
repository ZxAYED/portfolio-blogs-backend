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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const multer_config_1 = __importDefault(require("../../utils/multer.config"));
const UploadImageToCloudinary_1 = __importDefault(require("../../utils/UploadImageToCloudinary"));
const router = express_1.default.Router();
router.post('/', user_controller_1.userController.createUser);
router.post('/login', user_controller_1.userController.loginUser);
router.post('/contact', user_controller_1.userController.createContact);
router.get('/', user_controller_1.userController.getAllUser);
router.get('/contact', user_controller_1.userController.getAllContact);
router.delete('/contact/:id', user_controller_1.userController.deleteContact);
router.delete('/:id', user_controller_1.userController.deleteUser);
router.post('/kela', multer_config_1.default.single('file'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    if (file) {
        const imageName = file.originalname;
        const path = file === null || file === void 0 ? void 0 : file.buffer;
        const uploadResponse = yield (0, UploadImageToCloudinary_1.default)(imageName, path);
        res.json(uploadResponse);
    }
}));
exports.userRouter = router;
