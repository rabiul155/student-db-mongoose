import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { academicDepartmentServices } from './academicDepartment.services';

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await academicDepartmentServices.createAcademicDepartment(
      req.body,
    );
    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: {
        result,
      },
    });
  },
);
const updateAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await academicDepartmentServices.updateAcademicDepartment(
      req.params.id,
      req.body,
    );
    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: {
        result,
      },
    });
  },
);

const getAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const results = await academicDepartmentServices.getAcademicDepartment();
    res.status(201).json({
      success: true,
      message: 'Department created successfully',
      data: {
        results,
      },
    });
  },
);

const getSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res, next) => {
    const results =
      await academicDepartmentServices.getSingleAcademicDepartment(
        req.params.id,
      );
    res.status(201).json({
      success: true,
      message: 'Department fetched successfully',
      data: {
        results,
      },
    });
  },
);
const deleteDepartment: RequestHandler = catchAsync(async (req, res, next) => {
  const results = await academicDepartmentServices.deleteAcademicDepartment(
    req.params.id,
  );
  res.status(201).json({
    success: true,
    message: 'Department deleted successfully',
    data: {
      results,
    },
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
  deleteDepartment,
};
