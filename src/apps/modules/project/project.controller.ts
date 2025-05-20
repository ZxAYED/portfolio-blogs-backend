
import catchAsync from '../../utils/catchAsync';
import { ProjectService } from './project.service';



const createProject = catchAsync(async (req, res) => {
  console.log("ei page a ashei na controller")
  const result = await ProjectService.createProjectIntoDb(
    req.file,
    req.body,
  )
  console.log("🚀 ~ createProject controller ~ result:",  req.file,
    req.body,)
  res.json({
    success: true,
    message: 'Project created successfully',
    statusCode: 201,
    data: result,
  })
})

const getAllProjects = catchAsync(async (req, res) => {
  const result = await ProjectService.getAllProjectsFromDb()
  res.json({
    success: true,
    message: 'Projects are retrieved successfully',
    statusCode: 200,
    data: result,
  })
})
const getSingleProject = catchAsync(async (req, res) => {
  const result = await ProjectService.getSingleProjectFromDb(req.params.id)



  res.json({
    success: true,
    message: 'Project retrieved successfully',
    statusCode: 200,
    data: result,
  })
})
const updateProjects = catchAsync(async (req, res) => {
  const result = await ProjectService.updateProjectsFromDb(req.params.id, req.body)
  res.json({
    success: true,
    message: 'Project updated successfully',
    statusCode: 200,
    data: result,
  })
})
const deleteProject = catchAsync(async (req, res) => {
  const result = await ProjectService.deleteProjectsFromDb(req.params.id)
  res.json({
    success: true,
    message: 'Project Deleted successfully',
    statusCode: 200,
    data: result,
  })
})

export const projectController = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProjects,
  deleteProject,
}
