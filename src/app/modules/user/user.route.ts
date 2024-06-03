import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../utils/validateRequest';
import { studentValidationSchema } from '../student/student.zod.validation';
import adminValidationSchema from '../admin/admin.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidationSchema),
  userController.createStudent,
);

router.post(
  '/create-admin',
  validateRequest(adminValidationSchema),
  userController.createAdmin,
);

export const userRoute = router;
