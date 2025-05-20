import catchAsync from '../../utils/catchAsync'
import { userService } from './user.service'

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUserIntoDb(req.body)
  res.json({
    success: true,
    message: 'User registered successfully',
    statusCode: 200,
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const result = await userService.loginUser(req.body)
  res.json({
    success: true,
    message: 'User logged in successfully',
    statusCode: 200,
    data: result,
  })
})
const createContact = catchAsync(async (req, res) => {
  const result = await userService.contactIntoDb(req.body)
  res.json({
    success: true,
    message: 'Messege created successfully',
    statusCode: 200,
    data: result,
  })
})
const deleteContact = catchAsync(async (req, res) => {
  const result = await userService.contactDeleteIntoDb(req.params.id)
  res.json({
    success: true,
    message: 'Messege deleted successfully',
    statusCode: 200,
    data: result,
  })
})
const deleteUser = catchAsync(async (req, res) => {
  const result = await userService.deleteUserIntoDb(req.params.id)
  res.json({
    success: true,
    message: 'User deleted successfully',
    statusCode: 200,
    data: result,
  })
})
const getAllUser = catchAsync(async (req, res) => {
  const result = await userService.getAllUsersFromDb()
  res.json({
    success: true,
    message: 'All Contacts has been retrieved successfully',
    statusCode: 200,
    data: result,
  })
})
const getAllContact = catchAsync(async (req, res) => {
  const result = await userService.getAllContactFromDb()
  res.json({
    success: true,
    message: 'All data has been retrieved successfully',
    statusCode: 200,
    data: result,
  })
})

export const userController = {
  createUser, deleteUser,
  getAllUser, createContact, deleteContact, getAllContact,loginUser
}
