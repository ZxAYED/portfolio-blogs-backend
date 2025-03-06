import express from 'express'

import AppError from '../../Errorhandlers/AppError'
import validateRequest from '../../middleWares/validateRequest'
import upload from '../../utils/multer.config'
import { blogController } from './blog.controller'
import { blogValidation } from './blog.validation'

const router = express.Router()
declare module 'express-serve-static-core' {
  interface Request {
    file?: any;
  }
}
router.post(

  '/', upload.single('imageUrl'),
  (req, res, next) => {
    if (!req.body || !req.file) {
      return next(new AppError(400, 'Missing required fields or file'));
    }
    req.body.imageUrl = req.file;
    next();
  },
  validateRequest(blogValidation.createBlogSchema),

  blogController.createBlog,
)

router.get('/', blogController.getAllBlogs)
router.get('/:id', blogController.getSingleBlog)

router.patch(
  '/:id',

  validateRequest(blogValidation.updateBlogSchema),
  blogController.updateblogs,
)

router.delete('/:id', blogController.deleteblog)

export const blogRoutes = router
