import catchAsync from '../../utils/catchAsync'
import { adminService } from './admin.service'

const createAdmin = catchAsync(async (req, res) => {
  const result = await adminService.createAdminFromDb(req.params.id)
  res.json({
    success: true,
    message: 'Admin creation successfull',
    statusCode: 200,
    data: result,
  })
})
const blockUser = catchAsync(async (req, res) => {
  const result = await adminService.blockUserFromDb(req.params.userId)

  res.json({
    success: true,
    message: 'User has been blocked successfully',
    statusCode: 200,
    data: result,
  })
})
const deleteBlog = catchAsync(async (req, res) => {
  const result = await adminService.deleteblogsFromDb(req.params.id)

  res.json({
    success: true,
    message: 'blog has been blocked successfully',
    statusCode: 200,
    data: result,
  })
})
export const adminController = {
  createAdmin,
  blockUser,
  deleteBlog,
}
