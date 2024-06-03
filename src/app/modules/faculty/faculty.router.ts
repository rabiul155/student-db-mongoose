import express from 'express';
import { facultyController } from './faculty.controller';

const router = express.Router();

router.get('/', facultyController.getAllFaculty);
router
  .route('/:id')
  .get(facultyController.getSingleFaculty)
  .patch(facultyController.updateFaculty)
  .delete(facultyController.deleteFaculty);

export const facultyRouter = router;
