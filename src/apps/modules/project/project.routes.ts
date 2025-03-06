import express from 'express'


import validateRequest from '../../middleWares/validateRequest'

import AppError from '../../Errorhandlers/AppError'
import upload from '../../utils/multer.config'
import { projectController } from './project.controller'
import { projectValidation } from './project.validation'

const router = express.Router()


router.post(
  '/', upload.single('imageUrl'),
  (req, res, next) => {
    if (!req.body || !req.file) {
      return next(new AppError(400, 'Missing required fields or file'));
    }
    req.body.imageUrl = req.file;
    next();
  },
  validateRequest(projectValidation.createProjectSchema),

  projectController.createProject,
)

router.get('/', projectController.getAllProjects)
router.get('/:id', projectController.getSingleProjects)

router.patch(
  '/:id',
  upload.single('imageUrl'),
  (req, res, next) => {
    if (!req.body || !req.file) {
      return next(new AppError(400, 'Missing required fields or file'));
    }
    req.body.imageUrl = req.file;
    next();
  },
  validateRequest(projectValidation.updateProjectSchema),
  projectController.updateProjects,
)

router.delete('/:id', projectController.deleteProject)

export const ProjectRoutes = router
