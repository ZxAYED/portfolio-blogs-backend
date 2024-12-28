import express from 'express'
import { userController } from '../user/user.controller'
import { authController } from './auth.controller'

const router = express.Router()

router.post('/register', userController.createUser)
router.post('/login', authController.loginUser)

export const authRouter = router
