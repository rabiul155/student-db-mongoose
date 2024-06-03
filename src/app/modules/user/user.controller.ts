import { RequestHandler } from 'express';
import { userServices } from './user.services';
import { catchAsync } from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, student } = req.body;
  const result = await userServices.createStudentIntoDB(password, student);
  res.status(201).json({
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});
const createAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const { password, admin } = req.body;
  const result = await userServices.createAdminIntoDB(password, admin);
  res.status(201).json({
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});

export const userController = {
  createStudent,
  createAdmin,
};
