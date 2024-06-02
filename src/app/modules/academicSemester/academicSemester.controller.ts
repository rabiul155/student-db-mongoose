import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { academicSemesterServices } from './academicSemester.services';

const getAcademicSemester: RequestHandler = async (req, res, next) => {
  const result = await academicSemesterServices.getAcademicSemester();
  res.status(201).json({
    success: true,
    message: 'Academic semester fetched successfully',
    data: {
      result,
    },
  });
};

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await academicSemesterServices.createAcademicSemester(
    req.body,
  );
  res.status(201).json({
    success: true,
    message: 'Academic semester created successfully',
    data: {
      result,
    },
  });
});

const getSingleAcademicSemester: RequestHandler = async (req, res, next) => {
  const result = await academicSemesterServices.getSingleAcademicSemester(
    req.params.id,
  );

  res.status(201).json({
    success: true,
    message: 'Academic semester fetched successfully',
    data: {
      result,
    },
  });
};

const updateAcademicSemester: RequestHandler = async (req, res, next) => {
  const result = await academicSemesterServices.updateAcademicSemester(
    req.params.id,
    req.body,
  );

  res.status(201).json({
    success: true,
    message: 'Academic semester updated successfully',
    data: {
      result,
    },
  });
};

export const academicSemesterController = {
  getAcademicSemester,
  createAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
