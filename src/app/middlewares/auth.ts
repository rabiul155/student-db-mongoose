import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { RoleType } from '../utils/constant';

const auth = (role: RoleType[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, 'Unauthorized');
    }
    // invalid token
    jwt.verify(token, config.jwt_secret as string, function (err, decoded) {
      if (err) {
        throw new AppError(403, 'You are not authorized');
      }

      const userRole = (decoded as JwtPayload).role;

      if (role && !role.includes(userRole)) {
        throw new AppError(403, 'You do not have this permission');
      }
      req.user = decoded as JwtPayload;
    });

    next();
  });
};

export default auth;
