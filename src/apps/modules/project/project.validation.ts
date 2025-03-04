// validation/projectValidation.ts

import { z } from 'zod';

export const createProjectSchema = z.object({

  projectName: z
    .string()
    .min(1, 'Project Name is required')
    .max(100, 'Project Name must be less than 100 characters'),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(1000, 'Description must be less than 500 characters'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  githubClientCode: z.string().url('Invalid GitHub URL'),
  githubServerCode: z.string().url('Invalid GitHub URL'),
  liveLink: z.string().url('Invalid Live Link URL'),
  imageUrl: z.string().url('Invalid Image URL'),
});

export const updateProjectSchema = z.object({
,
  projectName: z
    .string()
    .max(100, 'Project Name must be less than 100 characters')
    .optional(),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  features: z.array(z.string()).optional(),
  githubClientCode: z.string().url('Invalid GitHub URL').optional(),
  githubServerCode: z.string().url('Invalid GitHub URL').optional(),
  liveLink: z.string().url('Invalid Live Link URL').optional(),
  imageUrl: z.string().url('Invalid Image URL').optional(),
});

export const projectValidation = { createProjectSchema, updateProjectSchema };
