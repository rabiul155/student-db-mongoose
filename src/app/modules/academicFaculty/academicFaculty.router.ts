import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middleware/validateRequest';
import academicFacultyValidationSchema from './academicFaculty.validation';
const router = express.Router();

router
  .route('/')
  .get(academicFacultyController.getAcademicFaculty)
  .post(
    validateRequest(academicFacultyValidationSchema),
    academicFacultyController.createAcademicFaculty,
  );

router
  .route('/id')
  .get(academicFacultyController.getSingleAcademicFaculty)
  .patch(academicFacultyController.updateAcademicFaculty);

export const academicFacultyRouter = router;
