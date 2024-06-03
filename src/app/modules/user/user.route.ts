import express from 'express';
import { userController } from './user.controller';
import validateRequest from '../../utils/validateRequest';
import { studentValidationSchema } from '../student/student.zod.validation';
import adminValidationSchema from '../admin/admin.validation';
import facultyValidationSchema from '../faculty/faculty.validation';

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
router.post(
  '/create-faculty',
  validateRequest(facultyValidationSchema),
  userController.createFaculty,
);

export const userRoute = router;
