import express, { NextFunction, Request, Response } from 'express';
import handleZodError from './zodError';
import { ZodError } from 'zod';
import handleMongooseError from './mongooseError';
import handleCastError from './castError';
import AppError from './AppError';
import handleDuplicateError from './duplicateError';
import { CustomError, IErrorSource } from './error.interface';

import { Error as MongooseError } from 'mongoose';

function isValidationError(err: any): err is MongooseError.ValidationError {
  return err?.name === 'ValidationError';
}

function isCastError(err: any): err is MongooseError.CastError {
  return err?.name === 'CastError';
}

function isMongoError(err: any): err is MongooseError & { code: number } {
  return err?.name === 'MongoError' && (err as any).code === 11000;
}





const GlobalErrorHandlers = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  let ErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    // ErrorSource = simplifiedError.errorSource;
  } else if (isValidationError(err)) {
    const simplifiedError = handleMongooseError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    ErrorSource = simplifiedError.errorSource;
  } else if (isCastError(err)) {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    ErrorSource = simplifiedError.errorSource;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    ErrorSource = [
      {
        path: 'No path found',
        message: err?.message,
      },
    ];
  } else if (isMongoError(err)) {
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    ErrorSource = simplifiedError.errorSource;
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    stack: err.stack || 'No stack available',
    error: { details: err },
  });

  next();
};

export default GlobalErrorHandlers as unknown as express.ErrorRequestHandler;
