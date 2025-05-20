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
exports.userController = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const user_service_1 = require("./user.service");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createUserIntoDb(req.body);
    res.json({
        success: true,
        message: 'User registered successfully',
        statusCode: 200,
        data: result,
    });
}));
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.loginUser(req.body);
    res.json({
        success: true,
        message: 'User logged in successfully',
        statusCode: 200,
        data: result,
    });
}));
const createContact = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.contactIntoDb(req.body);
    res.json({
        success: true,
        message: 'Messege created successfully',
        statusCode: 200,
        data: result,
    });
}));
const deleteContact = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.contactDeleteIntoDb(req.params.id);
    res.json({
        success: true,
        message: 'Messege deleted successfully',
        statusCode: 200,
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.deleteUserIntoDb(req.params.id);
    res.json({
        success: true,
        message: 'User deleted successfully',
        statusCode: 200,
        data: result,
    });
}));
const getAllUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllUsersFromDb();
    res.json({
        success: true,
        message: 'All Contacts has been retrieved successfully',
        statusCode: 200,
        data: result,
    });
}));
const getAllContact = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getAllContactFromDb();
    res.json({
        success: true,
        message: 'All data has been retrieved successfully',
        statusCode: 200,
        data: result,
    });
}));
exports.userController = {
    createUser, deleteUser,
    getAllUser, createContact, deleteContact, getAllContact, loginUser
};
