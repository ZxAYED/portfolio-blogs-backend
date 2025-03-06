import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

router.get('/', userController.getAllUser)
router.post('/', userController.getAllUser)
router.post('/contact', userController.createContact)
router.get('/contact', userController.getAllContact)
router.delete('/contact/:id', userController.deleteContact)

export const userRouter = router
