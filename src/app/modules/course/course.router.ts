import express from 'express';
import { courseController } from './course.controller';
import validateRequest from '../../utils/validateRequest';
import {
  courseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation';

const router = express.Router();

router
  .route('/')
  .get(courseController.getAllCourse)
  .post(validateRequest(courseValidationSchema), courseController.createCourse);

router
  .route('/:id')
  .get(courseController.getSingleCourse)
  .delete(courseController.deleteCourse)
  .patch(
    validateRequest(updateCourseValidationSchema),
    courseController.updateCourse,
  );

export const courseRouter = router;
