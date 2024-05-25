import { NextFunction, Request, Response } from 'express';
// import studentValidationSchema from '../student/student.zod.validation';
import { userServices } from './user.services';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student } = req.body;

    // studentValidationSchema.parse(student);

    const result = await userServices.createStudentIntoDB(password, student);
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createStudent,
};
