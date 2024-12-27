import { NextFunction, Request, Response } from 'express';


declare global {
    const req: Request;
    const res: Response;
    const next: NextFunction
}

export { };
