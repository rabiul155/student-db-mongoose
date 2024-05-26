import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { academicSemesterValidationSchema } from './academicSemester.validation';
import { academicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidationSchema),
  academicSemesterController.createAcademicSemester,
);

export const academicSemesterRouter = router;
