import express from 'express'

import auth from '../../middleWares/auth'
import { blogController } from './blog.controller'
import validateRequest from '../../middleWares/validateRequest'
import { blogValidation } from './blog.validation'

const router = express.Router()

router.post(
  '/',
  validateRequest(blogValidation.createBlogSchema),
  auth('user', 'admin'),
  blogController.createBlog,
)

router.get('/', blogController.getAllBlogs)

router.patch(
  '/:id',
  auth('user', 'admin'),
  validateRequest(blogValidation.updateBlogSchema),
  blogController.updateblogs,
)

router.delete('/:id', auth('user', 'admin'), blogController.deleteblog)

export const blogRoutes = router
