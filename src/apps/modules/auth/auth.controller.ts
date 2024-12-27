import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { authService } from "./auth.service";

const loginUser = catchAsync(async (req: Request, res: Response) => {

    const result = await authService.loginUserIntoDb(req.body)
    res.json({
        success: true,
        message: "Logged in successfully",
        statusCode: 200,
        data: result
    })

})


export const authController = {
    loginUser
}