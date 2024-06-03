import { RequestHandler } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { adminServices } from './admin.services';

const getAllAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const results = await adminServices.getAllAdminDB();

  res.status(200).json({
    success: true,
    message: 'Admin get successfully',
    data: {
      results,
    },
  });
});
const getSingleAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await adminServices.getSingleAdminDB(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Admin get successfully',
    data: {
      result,
    },
  });
});
const updateAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await adminServices.updateAdminDB(req.params, req.body);

  res.status(200).json({
    success: true,
    message: 'Admin get successfully',
    data: {
      result,
    },
  });
});

const deleteAdmin: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await adminServices.deleteAdminDB(req.params.id);

  res.status(200).json({
    success: true,
    message: 'Admin deleted successfully',
    data: {
      result,
    },
  });
});

export const adminController = {
  getAllAdmin,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
