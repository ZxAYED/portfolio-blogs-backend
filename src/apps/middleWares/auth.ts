import e, { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '../Errorhandlers/AppError';
import { CustomRequest, TRole } from '../Errorhandlers/error.interface';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import { userModel } from '../modules/user/user.model';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

const auth = (...requiredRoles: TRole[]) => {
  // e.Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>
  return catchAsync(async (req: any, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(401, 'You are not Authorized');
    }

    const decoded = jwt.verify(token, config.secret as string) as JwtPayload;

    const userEmail = decoded.data?.userEmail;
    const role = decoded.data?.role;
    console.log(decoded);

    const isUserExists = await userModel.findOne({ email: userEmail });

    if (!isUserExists) {
      throw new AppError(400, 'User not found');
    }

    if (isUserExists.isBlocked) {
      throw new AppError(400, 'User is blocked');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You are not Authorized');
    }

    req.user = decoded as JwtPayload
    next();
  });
};

export default auth;
