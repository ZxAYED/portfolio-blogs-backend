
import config from "../../config";
import AppError from "../../Errorhandlers/AppError";
import QueryBuilder from "../../middleWares/QueryBuilder";
import { userModel } from "../user/user.model";
import { IBlog, IQuery } from "./blog.interface";
import { blogModel } from "./blog.model";
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from './../../Errorhandlers/AppError';

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
    if (typeof payload.content !== 'string') {
        throw new AppError(400, " Content must be  string ")
    }
    payload.author = isUserExists._id

    const result = await blogModel.create(payload)
    return result
}

const getAllBlogsFromDb = async (query: IQuery) => {

    // filter sort search
    const searchableFields = ["title", "content"]

    const blogsQuery = new QueryBuilder(blogModel.find().populate('author'), query)
        .search(searchableFields)
        .filter()
        .sort()
        .pagination()




    const result = await blogsQuery.QueryModel

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