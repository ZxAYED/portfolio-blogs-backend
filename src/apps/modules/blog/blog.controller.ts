import catchAsync from '../../utils/catchAsync'
import { blogService } from './blog.service'

const createBlog = catchAsync(async (req, res) => {
  const result = await blogService.createBlogIntoDb(
    req.headers.authorization as string,
    req.body,
  )
  res.json({
    success: true,
    message: 'Blog created successfully',
    statusCode: 201,
    data: result,
  })
})

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await blogService.getAllBlogsFromDb(req.query)
  res.json({
    success: true,
    message: 'Blogs are retrieved successfully',
    statusCode: 200,
    data: result,
  })
})
const updateblogs = catchAsync(async (req, res) => {
  const result = await blogService.updateblogsFromDb(req.params.id, req.body)
  res.json({
    success: true,
    message: 'Blog updated successfully',
    statusCode: 200,
    data: result,
  })
})
const deleteblog = catchAsync(async (req, res) => {
  const result = await blogService.deleteblogsFromDb(req.params.id)
  res.json({
    success: true,
    message: 'Blog Deleted successfully',
    statusCode: 200,
    data: result,
  })
})

export const blogController = {
  createBlog,
  getAllBlogs,
  updateblogs,
  deleteblog,
}
