
import config from "../../config";
import AppError from "../../Errorhandlers/AppError";
import { userModel } from "../user/user.model";
import { IBlog } from "./blog.interface";
import { blogModel } from "./blog.model";
import jwt, { JwtPayload } from 'jsonwebtoken';

const createBlogIntoDb = async (tokens: string, payload: IBlog) => {

    const token = tokens.split(' ')[1]

    const decoded = jwt.verify(token, config.secret as string)
    const { userEmail } = decoded?.data as JwtPayload

    const isUserExists = await userModel.findOne({ email: userEmail })

    if (!isUserExists) {
        throw new AppError(400, 'User not found')
    }
    if (isUserExists.isBlocked) {
        throw new AppError(400, 'User not found')
    }

    payload.author = isUserExists._id

    const result = await blogModel.create(payload)
    return result
}

const getAllBlogsFromDb = async () => {
    const result = await blogModel.find().populate('author')
    return result
}
const updateblogsFromDb = async (id: string, payload: IBlog) => {

    const result = await blogModel.findByIdAndUpdate(id, payload, { new: true, runValidators: true })
    return result
}
const deleteblogsFromDb = async (id: string) => {

    const result = await blogModel.deleteOne({ _id: id })
    return result
}

export const blogService = {
    createBlogIntoDb,
    getAllBlogsFromDb,
    updateblogsFromDb,
    deleteblogsFromDb
}