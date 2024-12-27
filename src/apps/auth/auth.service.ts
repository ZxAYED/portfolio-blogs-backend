import config from "../config";
import AppError from "../errorhandlers/AppError";
import { userModel } from "../user/user.model";
import { ILogin } from "./auth.interface";
import jwt from 'jsonwebtoken'



const loginUserIntoDb = async (payload: ILogin) => {

    const isUserExists = await userModel.findOne({ email: payload.email })

    if (!isUserExists) {
        throw new AppError(404, "User not found")
    }
    if (isUserExists.isBlocked) {
        throw new AppError(404, "User not found")
    }
    if (isUserExists.password !== payload.password) {
        throw new AppError(401, "Wrong Password")
    }


    const jwtPayload = {
        userEmail: isUserExists.email,
        role: isUserExists.role
    }

    const accessToken =
        jwt.sign({
            data: jwtPayload
        }, config.secret as string, { expiresIn: 60 * 60 });

    return {
        accessToken
    }

}
export const authService = {
    loginUserIntoDb
}