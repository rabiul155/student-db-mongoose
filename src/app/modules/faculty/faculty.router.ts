import express from 'express';
import { facultyController } from './faculty.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  auth(['student', 'admin', 'faculty']),
  facultyController.getAllFaculty,
);
router
  .route('/:id')
  .get(auth([]), facultyController.getSingleFaculty)
  .patch(facultyController.updateFaculty)
  .delete(facultyController.deleteFaculty);

export const facultyRouter = router;
