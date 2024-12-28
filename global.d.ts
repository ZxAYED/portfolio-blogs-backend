import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';


declare global {
    const req: Request;
    const res: Response;
    const next: NextFunction
}

declare global {
    namespace Express {
        interface Request {
            user: JwtPayload
        }
    }
}

export { };
