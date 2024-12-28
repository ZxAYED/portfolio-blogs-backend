import config from "../../config";
import AppError from "../../Errorhandlers/AppError";
import { userModel } from "../user/user.model";
import { ILogin } from "./auth.interface";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';



const loginUserIntoDb = async (payload: ILogin) => {

    const isUserExists = await userModel.findOne({ email: payload.email })

    if (!isUserExists) {
        throw new AppError(404, "User not found")
    }
    if (isUserExists.isBlocked) {
        throw new AppError(404, "User not found")
    }

    const isPasswordMactched = await bcrypt.compare(payload.password, isUserExists.password);


    if (!isPasswordMactched) {
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