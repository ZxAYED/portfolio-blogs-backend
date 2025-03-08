

import UploadImageToCloudinary from '../../utils/UploadImageToCloudinary';
import { IBlog } from './blog.interface';
import { blogModel } from './blog.model';



const createBlogIntoDb = async (file: any, payload: IBlog) => {
  if (file) {
    const imageName = `${payload?.title}+${Date.now()}`;
    const path = file?.buffer;
    const uploadResponse = await UploadImageToCloudinary(imageName, path);
    payload.imageUrl = uploadResponse.url;

  }
  const result = await blogModel.create(payload)
  return result
}

const getAllBlogsFromDb = async () => {
  const result = await blogModel.find()

  return result
}
const getSingleBlogsFromDb = async (id: string) => {


  const result = await blogModel.findById(id)

  return result
}

const updateblogsFromDb = async (id: string, payload: IBlog) => {
  const result = await blogModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const deleteblogsFromDb = async (id: string) => {
  const result = await blogModel.deleteOne({ _id: id })
  return result
}

export const blogService = {
  createBlogIntoDb,
  getAllBlogsFromDb,
  updateblogsFromDb, getSingleBlogsFromDb,
  deleteblogsFromDb,
}
