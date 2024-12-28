import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../Errorhandlers/AppError';
import { TRole } from '../Errorhandlers/error.interface';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { userModel } from '../modules/user/user.model';

interface IDecoded {
  userEmail: string;
  role: TRole;
}

const auth = (...requiredRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(401, 'You are not Authorized');
    }

    const decoded = jwt.verify(token, config.secret as string) as JwtPayload & IDecoded;

    // if (decoded && typeof decoded !== 'string') {
    const { userEmail, role } = decoded.data;

    const isUserExists = await userModel.findOne({ email: userEmail });

    if (!isUserExists) {
      throw new AppError(400, 'User not found');
    }

    if (isUserExists.isBlocked) {
      throw new AppError(400, 'User not found');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not Authorized');
    }

    req.user = decoded as JwtPayload;
    next();

  });
};

export default auth;
