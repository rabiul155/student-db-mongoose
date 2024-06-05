import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { courseServices } from './course.services';

const createCourse: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await courseServices.createCourseIntoDB(req.body);

  res.status(201).json({
    success: true,
    message: 'Course create successfully',
    data: {
      result,
    },
  });
});

const getAllCourse: RequestHandler = catchAsync(async (req, res, next) => {
  const results = await courseServices.getAllCourseFormDB(req.query);

  res.status(200).json({
    success: true,
    message: 'Course find successfully',
    data: {
      results,
    },
  });
});

const getSingleCourse: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await courseServices.getSingleCourseFormDB(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Course find successfully',
    data: {
      result,
    },
  });
});

const deleteCourse: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await courseServices.deleteCourseFormDB(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Course deleted successfully',
    data: {
      result,
    },
  });
});
const updateCourse: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await courseServices.updateCourseToDB(req.params.id, req.body);

  res.status(200).json({
    success: true,
    message: 'Course updated successfully',
    data: {
      result,
    },
  });
});
const assignFaculties: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await courseServices.addCourseFacultiesToDB(
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: 'Faculty updated successfully',
    data: {
      result,
    },
  });
});
const removeFaculties: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await courseServices.removeCourseFacultiesToDB(
    req.params.id,
    req.body,
  );

  res.status(200).json({
    success: true,
    message: 'Faculty deleted successfully',
    data: {
      result,
    },
  });
});

export const courseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFaculties,
  removeFaculties,
};
