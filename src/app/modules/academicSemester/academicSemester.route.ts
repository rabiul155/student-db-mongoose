import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { academicSemesterValidationSchema } from './academicSemester.validation';
import { academicSemesterController } from './academicSemester.controller';

const router = express.Router();

router
  .route('/')
  .get(academicSemesterController.getAcademicSemester)
  .post(
    validateRequest(academicSemesterValidationSchema),
    academicSemesterController.createAcademicSemester,
  );

router
  .route('/:id')
  .get(academicSemesterController.getSingleAcademicSemester)
  .patch(academicSemesterController.updateAcademicSemester);

export const academicSemesterRouter = router;
