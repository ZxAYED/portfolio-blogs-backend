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
  githubClientCode: z.string(),
  githubServerCode: z.string(),
  liveLink: z.string(),

});

export const updateProjectSchema = z.object({

  projectName: z
    .string()
    .max(100, 'Project Name must be less than 100 characters')
    .optional(),
  description: z
    .string()
    .max(500, 'Description must be less than 500 characters')
    .optional(),
  features: z.array(z.string()).optional(),
  githubClientCode: z.string().optional(),
  githubServerCode: z.string().optional(),
  liveLink: z.string().optional(),

});

export const projectValidation = { createProjectSchema, updateProjectSchema };
