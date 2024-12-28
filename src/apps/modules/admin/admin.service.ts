import AppError from "../../Errorhandlers/AppError"
import { blogModel } from "../blog/blog.model"
import { userModel } from "../user/user.model"

const createAdminFromDb = async (payload: string) => {


    const isUserExists = await blogModel.findById(payload)
    if (!isUserExists) {
        throw new AppError(404, "User not found")
    }
    if (!isUserExists) {
        throw new AppError(404, "User not found")
    }

    const result = await userModel.findByIdAndUpdate(payload, { role: 'admin' }, { new: true, runValidators: true })

    return result

}
const blockUserFromDb = async (payload: string) => {


    const isUserExists = await userModel.findById(payload)

    if (!isUserExists) {
        throw new AppError(404, "User not found")
    }
    if (isUserExists.isBlocked) {
        throw new AppError(404, "User not found")
    }


    const result = await userModel.findByIdAndUpdate(payload, { isBlocked: true }, { new: true, runValidators: true })

    return result

}
const deleteblogsFromDb = async (payload: string) => {

    const isBlogExists = await blogModel.findById(payload)


    if (!isBlogExists) {
        throw new AppError(404, "Blog not found")
    }
    if (!isBlogExists.isPublished) {
        throw new AppError(404, "Blog not found")
    }


    await blogModel.findByIdAndDelete(payload)

    return {
        "acknowledged": true,
        "deletedCount": 1
    }

}

export const adminService = {
    createAdminFromDb, blockUserFromDb,
    deleteblogsFromDb
}