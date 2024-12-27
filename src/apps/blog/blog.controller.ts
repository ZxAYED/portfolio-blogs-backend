
import catchAsync from "../utils/catchAsync";
import { blogService } from "./blog.service";


const createBlog = catchAsync(async (req, res) => {
    const result = await blogService.createBlogIntoDb
    res.json({
        success: true,
        message: 'Blog created successfully',
        statusCode: 201,
        data: result
    })

})
export const blogController = {
    createBlog
}