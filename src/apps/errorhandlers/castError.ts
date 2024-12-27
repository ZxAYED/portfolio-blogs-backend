import mongoose from "mongoose"
import { IErrorResponse, IErrorSource } from "./error.interface"

const handleCastError = (err: mongoose.Error.CastError): IErrorResponse => {

    const errorSource: IErrorSource[] = [{
        path: err.path,
        message: err.message
    }]
    const statusCode = 400
    return {
        statusCode,
        message: "Validation Error",
        errorSource
    }

}
export default handleCastError