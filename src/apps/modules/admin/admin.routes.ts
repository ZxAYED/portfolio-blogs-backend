import express from 'express'
import { adminController } from './admin.controller'
import auth from '../../middleWares/auth'

const router = express.Router()

router.patch('/:id', auth('user'), adminController.createAdmin)

router.patch('/users/:userId/block', auth('admin'), adminController.blockUser)

router.delete('/blogs/:id', auth('admin'), adminController.deleteBlog)

export const adminRouter = router
