"use strict";
// validation/projectValidation.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectValidation = exports.updateProjectSchema = exports.createProjectSchema = void 0;
const zod_1 = require("zod");
exports.createProjectSchema = zod_1.z.object({
    projectId: zod_1.z.string(),
    projectName: zod_1.z
        .string()
        .min(1, 'Project Name is required')
        .max(100, 'Project Name must be less than 100 characters'),
    description: zod_1.z
        .string()
        .min(1, 'Description is required')
        .max(1000, 'Description must be less than 500 characters'),
    features: zod_1.z.array(zod_1.z.string()).min(1, 'At least one feature is required'),
    myLearnings: zod_1.z.array(zod_1.z.string()).min(1, 'At least one myLearnings is required'),
    techStack: zod_1.z.array(zod_1.z.string()).min(1, 'At least one techStack is required'),
    githubClientCode: zod_1.z.string(),
    githubServerCode: zod_1.z.string(),
    liveLink: zod_1.z.string(),
});
exports.updateProjectSchema = zod_1.z.object({
    projectId: zod_1.z.string().optional(),
    projectName: zod_1.z
        .string()
        .max(100, 'Project Name must be less than 100 characters')
        .optional(),
    description: zod_1.z
        .string()
        .max(500, 'Description must be less than 500 characters')
        .optional(),
    features: zod_1.z.array(zod_1.z.string()).optional(),
    githubClientCode: zod_1.z.string().optional(),
    githubServerCode: zod_1.z.string().optional(),
    liveLink: zod_1.z.string().optional(),
    myLearnings: zod_1.z.array(zod_1.z.string()).min(1, 'At least one myLearnings is required').optional(),
    techStack: zod_1.z.array(zod_1.z.string()).min(1, 'At least one techStack is required').optional(),
});
exports.projectValidation = { createProjectSchema: exports.createProjectSchema, updateProjectSchema: exports.updateProjectSchema };
