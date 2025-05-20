import express from 'express'
import { userController } from './user.controller'

const router = express.Router()

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.post('/contact', userController.createContact)
router.get('/', userController.getAllUser)
router.get('/contact', userController.getAllContact)
router.delete('/contact/:id', userController.deleteContact)
router.delete('/:id', userController.deleteUser)

export const userRouter = router
