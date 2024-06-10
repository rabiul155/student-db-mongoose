import config from '../../config';
import { AppError } from '../../errors/AppError';
import UserModel from '../user/user.model';
import { AuthType } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: AuthType) => {
  const user = await UserModel.findOne({ id: payload.id });
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  if (user?.isDeleted) {
    throw new AppError(400, 'User is deleted');
  }
  if (user?.status === 'blocked') {
    throw new AppError(400, 'User is blocked');
  }

  const isAuthenticated = await bcrypt.compare(payload.password, user.password);

  if (!isAuthenticated) {
    throw new AppError(400, 'Invalid id or password');
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  // create jwt token and send to client

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: '10d',
  });
  return {
    accessToken,
    needPasswordChange: user.needPasswordChange,
  };
};

export const authServices = {
  loginUser,
};
