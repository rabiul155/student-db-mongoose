import express from 'express';
import { courseController } from './course.controller';
import validateRequest from '../../utils/validateRequest';
import { courseValidationSchema } from './course.validation';

const router = express.Router();

router
  .route('/')
  .get(courseController.getAllCourse)
  .post(validateRequest(courseValidationSchema), courseController.createCourse);

router
  .route('/:id')
  .get(courseController.getSingleCourse)
  .delete(courseController.deleteCourse);

export const courseRouter = router;
