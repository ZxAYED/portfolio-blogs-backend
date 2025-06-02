import express, { NextFunction, Request, Response } from 'express'
import { userController } from './user.controller'
import upload from '../../utils/multer.config'
import UploadImageToCloudinary from '../../utils/UploadImageToCloudinary'

const router = express.Router()

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.post('/contact', userController.createContact)
router.get('/', userController.getAllUser)
router.get('/contact', userController.getAllContact)
router.delete('/contact/:id', userController.deleteContact)
router.delete('/:id', userController.deleteUser)


router.post(
  '/kela', upload.single('file'),async(req: Request, res: Response, next: NextFunction) => {
    const file = req.file;
   if (file) {
    const imageName = file.originalname;
    const path = file?.buffer;
    const uploadResponse = await UploadImageToCloudinary(imageName, path);
    res.json(uploadResponse);

  }
  }
 
 
)


export const userRouter = router
