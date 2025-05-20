
import AppError from '../../Errorhandlers/AppError';
import UploadImageToCloudinary from '../../utils/UploadImageToCloudinary';
import { IProject } from './project.interface';
import ProjectModel from './project.model';




const createProjectIntoDb = async (file: any, payload: IProject) => {
  if (file) {
    const imageName = `${payload?.projectName}+${Date.now()}`;
    const path = file?.buffer;
    const uploadResponse = await UploadImageToCloudinary(imageName, path);
    payload.imageUrl = uploadResponse.url;

  }
  const result = await ProjectModel.create(payload)
  return result
}

const getAllProjectsFromDb = async () => {
  const result = await ProjectModel.find().sort({ projectId: 1 })
  

  return result
}
const getSingleProjectFromDb = async (id: string) => {

  
  const result = await ProjectModel.findById(id)
  
  return result
}

const updateProjectsFromDb = async (id: string, payload: IProject) => {
  const result = await ProjectModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteProjectsFromDb = async (id: string) => {
  const result = await ProjectModel.findByIdAndDelete(id)
  console.log("🚀 ~ deleteProjectsFromDb ~ result:", result)
  return result
}

export const ProjectService = {
  createProjectIntoDb,
  getAllProjectsFromDb,
  getSingleProjectFromDb,
  updateProjectsFromDb,
  deleteProjectsFromDb,
}
