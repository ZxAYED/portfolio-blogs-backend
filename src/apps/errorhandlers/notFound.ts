import { NextFunction, Request, Response } from "express"

const notFound = (req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> => {
    return res.status(500).json({
        error: "Resource not found"
    })
}
export default notFound