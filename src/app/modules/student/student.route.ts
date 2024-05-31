import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middleware/validateRequest';
import { updateStudentValidationSchema } from './student.zod.validation';

const router = express.Router();

// router.post('/create-student', StudentControllers.createStudent);

router.get('/', StudentControllers.getAllStudents);

router
  .route('/:studentId')
  .patch(
    validateRequest(updateStudentValidationSchema),
    StudentControllers.updateStudent,
  )
  .get(StudentControllers.getSingleStudent)
  .delete(StudentControllers.deleteStudent);

export const StudentRoutes = router;
