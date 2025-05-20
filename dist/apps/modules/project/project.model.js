"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const projectSchema = new mongoose_1.Schema({
    projectId: {
        type: String,
        required: true,
        unique: true,
        maxlength: [10, 'Project ID must be less than 10 characters'],
    },
    projectName: {
        type: String,
        required: true,
        maxlength: [100, 'Project Name must be less than 100 characters'],
    },
    description: {
        type: String,
        required: true,
        maxlength: [500, 'Description must be less than 500 characters'],
    },
    features: {
        type: [String],
        required: true,
        validate: [(val) => val.length > 0, 'At least one feature is required'],
    },
    myLearnings: {
        type: [String],
        required: true,
        validate: [(val) => val.length > 0, 'At least one My learning  is required'],
    },
    techStack: {
        type: [String],
        required: true,
        validate: [(val) => val.length > 0, 'At least one Tech stack is required'],
    },
    githubClientCode: {
        type: String,
        required: true,
    },
    githubServerCode: {
        type: String,
        required: true,
    },
    liveLink: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const ProjectModel = mongoose_1.default.model('Project', projectSchema);
exports.default = ProjectModel;
