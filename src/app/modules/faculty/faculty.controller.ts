import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { facultyServices } from './faculty.services';

const getAllFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const results = await facultyServices.getAllFacultyDB();

  res.status(200).json({
    success: true,
    message: 'Faculty get successfully',
    data: {
      results,
    },
  });
});
const getSingleFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await facultyServices.getSingleFacultyDB(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Faculty get successfully',
    data: {
      result,
    },
  });
});
const updateFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await facultyServices.updateFacultyDB(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'Faculty get successfully',
    data: {
      result,
    },
  });
});

const deleteFaculty: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await facultyServices.deleteFacultyDB(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Faculty deleted successfully',
    data: {
      result,
    },
  });
});

export const facultyController = {
  getAllFaculty,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
};
