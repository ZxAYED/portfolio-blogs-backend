import express, { Request, Response, NextFunction } from 'express';

const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | void => {
  return res.status(404).json({
    success: false,
    message: 'Resource not found',
    statusCode: 404,
  });
}

export default notFound as unknown as express.RequestHandler;
