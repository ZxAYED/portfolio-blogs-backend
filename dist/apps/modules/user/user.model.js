"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactModel = exports.userModel = void 0;
const mongoose_1 = require("mongoose");
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
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
const contactSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});
exports.userModel = (0, mongoose_1.model)('User', userSchema);
exports.contactModel = (0, mongoose_1.model)('Contact', contactSchema);
