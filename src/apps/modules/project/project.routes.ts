import express, { NextFunction, Request, Response } from 'express'


import validateRequest from '../../middleWares/validateRequest'

import AppError from '../../Errorhandlers/AppError'
import upload from '../../utils/multer.config'
import { projectController } from './project.controller'
import { projectValidation } from './project.validation'

const router = express.Router()


router.post(
  '/', upload.single('file'),
 
  (req: Request, res: Response, next: NextFunction) => {
    const parsedData = JSON.parse(req.body.data);
    req.body = projectValidation.createProjectSchema.parse(parsedData);
  
    return projectController.createProject(req, res, next);
  },
)

router.get('/', projectController.getAllProjects)
router.get('/:id', projectController.getSingleProject)

router.patch(
  '/:id',
  upload.single('file'),
  (req, res, next) => {
    if (!req.body || !req.file) {
      return next(new AppError(400, 'Missing required fields or file'));
    }


    const parsedData = JSON.parse(req.body.data);
    req.body = projectValidation.createProjectSchema.parse(parsedData)

    next();
  },

  projectController.updateProjects,
)

router.delete('/:id', projectController.deleteProject)

export const ProjectRoutes = router
