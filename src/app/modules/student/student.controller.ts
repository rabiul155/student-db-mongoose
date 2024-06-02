import { RequestHandler } from 'express';
import { StudentServices } from './student.service';
import { catchAsync } from '../../utils/catchAsync';
import { AppError } from '../../errors/AppError';

const getAllStudents: RequestHandler = catchAsync(async (req, res, next) => {
  const results = await StudentServices.getAllStudentsFromDB();

  if (!results.length) {
    throw new AppError(404, 'Student not found');
  }

  res.status(200).json({
    success: true,
    message: 'Students are retrieved successfully',
    data: results,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const result = await StudentServices.getSingleStudentFromDB(studentId);

  res.status(200).json({
    success: true,
    message: 'Student is retrieved successfully',
    data: result,
  });
});

const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;

  const result = await StudentServices.deleteStudent(studentId);

  res.status(200).json({
    success: true,
    message: 'Student is deleted successfully',
    data: result,
  });
});

const updateStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { studentId } = req.params;
  const { student } = req.body;

  const result = await StudentServices.updateStudent(studentId, student);

  res.status(200).json({
    success: true,
    message: 'Student is updated successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
