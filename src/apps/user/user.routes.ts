
import express from 'express';
import { userController } from './user.controller';

const router = express.Router()

router.post('/register', userController.createUser)
router.get('/register/:id', (req, res) => {
    res.json({
        "cholterase to": "ho mama"
    })
})

export const userRouter = router