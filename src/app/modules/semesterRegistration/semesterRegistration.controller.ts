import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { semesterRegistrationServices } from './semesterRegistration.services';

const createSemesterRegistration: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result =
      await semesterRegistrationServices.createSemesterRegistrationIntoDB(
        req.body,
      );

    res.status(201).json({
      success: true,
      message: 'Semester registration complete',
      data: {
        result,
      },
    });
  },
);

const getAllSemesterRegistration: RequestHandler = catchAsync(
  async (req, res, next) => {
    const results =
      await semesterRegistrationServices.getAllSemesterRegistration(req.query);

    res.status(200).json({
      success: true,
      message: 'Semester get successfully',
      data: {
        results,
      },
    });
  },
);
const getSingleSemesterRegistration: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result =
      await semesterRegistrationServices.getSingleSemesterRegistration(
        req.params.id,
      );

    res.status(200).json({
      success: true,
      message: 'Semester get successfully',
      data: {
        result,
      },
    });
  },
);
const updateSemesterRegistration: RequestHandler = catchAsync(
  async (req, res, next) => {
    const results =
      await semesterRegistrationServices.updateSemesterRegistration(
        req.params.id,
        req.body,
      );

    res.status(200).json({
      success: true,
      message: 'Semester updated successfully',
      data: {
        results,
      },
    });
  },
);
const deleteSemesterRegistration: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result =
      await semesterRegistrationServices.deleteSemesterRegistration(
        req.params.id,
      );

    res.status(200).json({
      success: true,
      message: 'Semester deleted successfully',
      data: {
        result,
      },
    });
  },
);

export const semesterRegistrationController = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  deleteSemesterRegistration,
  updateSemesterRegistration,
};
