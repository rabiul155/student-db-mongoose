import express from 'express';
import { courseController } from './course.controller';
import validateRequest from '../../utils/validateRequest';
import {
  courseValidationSchema,
  facultiesWithCourseValidationSchema,
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

router.put(
  '/:id/assign-faculties',
  validateRequest(facultiesWithCourseValidationSchema),
  courseController.assignFaculties,
);
router.delete(
  '/:id/remove-faculties',
  validateRequest(facultiesWithCourseValidationSchema),
  courseController.removeFaculties,
);

export const courseRouter = router;
