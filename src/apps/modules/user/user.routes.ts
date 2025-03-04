import express from 'express'
import auth from '../../middleWares/auth'
import { userController } from './user.controller'

const router = express.Router()

router.get('/', auth('user'), userController.getAllUser)

export const userRouter = router
