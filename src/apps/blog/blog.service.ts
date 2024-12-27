import { userModel } from "../user/user.model";
import { IBlog } from "./blog.interface";
import { blogModel } from "./blog.model";

const createBlogIntoDb = (payload: IBlog) => {

    // const token = req.headers.authorization
    // split token 
    // author object id ana
    // 
    // const authurId = await userModel.find({email:})
    // payload a author add kora 
    //   const result  = await blogModel.create(payload)
    // return result

}
export const blogService = {
    createBlogIntoDb
}