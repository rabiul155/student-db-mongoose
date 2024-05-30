import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { academicFacultyServices } from './academicFaculty.services';

const createAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await academicFacultyServices.createAcademicFaculty(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: 'Faculty created successfully',
      data: {
        result,
      },
    });
  },
);
const updateAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await academicFacultyServices.updateAcademicFaculty(
      req.params.id,
      req.body,
    );
    res.status(201).json({
      success: true,
      message: 'Faculty created successfully',
      data: {
        result,
      },
    });
  },
);

const getAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const results = await academicFacultyServices.getAcademicFaculty();
    res.status(201).json({
      success: true,
      message: 'Faculty created successfully',
      data: {
        results,
      },
    });
  },
);

const getSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req, res, next) => {
    const results = await academicFacultyServices.getSingleAcademicFaculty(
      req.params.id,
    );
    res.status(201).json({
      success: true,
      message: 'Faculty fetched successfully',
      data: {
        results,
      },
    });
  },
);

export const academicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
