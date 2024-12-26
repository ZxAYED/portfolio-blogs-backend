import { NextFunction, Request, Response } from "express"

// eslint-disable-next-line no-unused-vars
const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {

        fn(req, res, next).catch(next)
    }

}
export default catchAsync