
import express from 'express';

import auth from '../../middleWares/auth';
import { blogController } from './blog.controller';
import validateRequest from '../../middleWares/validateRequest';
import { blogValidation } from './blog.validation';

const router = express.Router()


router.post('/', validateRequest(blogValidation.createBlogSchema), auth('user'), blogController.createBlog)
router.get('/', blogController.getAllBlogs)

export const blogRoutes = router