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
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const AppError_1 = __importDefault(require("../../Errorhandlers/AppError"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUserExists = yield exports.userModel.findOne({ email: this.email });
        if (isUserExists) {
            throw new AppError_1.default(401, 'User already exists');
        }
        const user = this;
        const salt = yield bcryptjs_1.default.genSalt(parseInt(config_1.default.gen_salt, 10));
        user.password = yield bcryptjs_1.default.hash(user.password, salt);
        next();
    });
});
userSchema.set('toJSON', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});
userSchema.set('toObject', {
    transform: function (doc, ret) {
        delete ret.password;
        return ret;
    },
});
exports.userModel = (0, mongoose_1.model)('User', userSchema);
