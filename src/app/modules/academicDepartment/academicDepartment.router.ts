import express from 'express';
import { academicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middleware/validateRequest';
import academicDepartmentValidationSchema from './academicDepartment.validation';
const router = express.Router();

router
  .route('/')
  .get(academicDepartmentController.getAcademicDepartment)
  .post(
    validateRequest(academicDepartmentValidationSchema),
    academicDepartmentController.createAcademicDepartment,
  );

router
  .route('/:id')
  .get(academicDepartmentController.getSingleAcademicDepartment)
  .patch(academicDepartmentController.updateAcademicDepartment)
  .delete(academicDepartmentController.deleteDepartment);

export const academicDepartmentRouter = router;
