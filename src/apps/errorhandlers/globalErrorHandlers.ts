import { NextFunction, Request, Response } from 'express'
import handleZodError from './zodError'
import { ZodError } from 'zod'
import handleMongooseError from './mongooseError'
import handleCastError from './castError'
import AppError from './AppError'
import handleDuplicateError from './duplicateError'

const GlobalErrorHandlers = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): Response<any, Record<string, any>> => {
  let ErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ]

  let statusCode = err.statusCode || 500
  let message = err.message || 'Something went wrong'

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    ErrorSource = simplifiedError.errorSource
  }
  else if (err?.name === 'ValidationError') {
    const simplifiedError = handleMongooseError(err)
    message = simplifiedError.message
    ErrorSource = simplifiedError.errorSource
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err)
    message = simplifiedError.message
    ErrorSource = simplifiedError.errorSource
  }
  else if (err instanceof AppError) {
    statusCode = err.statusCode
    message = err.message
    ErrorSource = [
      {
        path: 'No path found',
        message: err?.message,
      },
    ]
  } else if (err?.name === 11000) {
    const simplifiedError = handleDuplicateError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    ErrorSource = simplifiedError.errorSource
  }

  return res.json({
    success: false,
    message,
    statusCode,

    stack: ErrorSource,
  })
}
export default GlobalErrorHandlers
