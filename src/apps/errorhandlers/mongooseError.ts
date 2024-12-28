import mongoose from 'mongoose'
import { IErrorResponse, IErrorSource } from './error.interface'

const handleMongooseError = (
  err: mongoose.Error.ValidationError,
): IErrorResponse[] => {
  const errorSource: IErrorSource[] = Object.values(err.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value.path,
        message: value.message,
      }
    },
  )

  const statusCode = 400
  return {
    errorSource,
    message: 'Validation Error',
    statusCode,
  }
}

export default handleMongooseError
