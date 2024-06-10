import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { authServices } from './auth.services';

const loginUser: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await authServices.loginUser(req.body);

  res.status(201).json({
    success: true,
    message: 'Login successfully',
    data: {
      result,
    },
  });
});

export const authController = {
  loginUser,
};
