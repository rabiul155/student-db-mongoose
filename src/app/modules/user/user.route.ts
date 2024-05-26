import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { studentValidationSchema } from '../student/student.zod.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidationSchema),
  userController.createStudent,
);

export const userRoute = router;
