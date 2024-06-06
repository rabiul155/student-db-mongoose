import express from 'express';
import { semesterRegistrationController } from './semesterRegistration.controller';
import validateRequest from '../../utils/validateRequest';
import { SemesterRegistrationValidationSchema } from './semesterRegistration.validation';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(SemesterRegistrationValidationSchema),
    semesterRegistrationController.createSemesterRegistration,
  )
  .get(semesterRegistrationController.getAllSemesterRegistration);

router
  .route('/:id')
  .get(semesterRegistrationController.getSingleSemesterRegistration)
  .patch(semesterRegistrationController.updateSemesterRegistration)
  .delete(semesterRegistrationController.deleteSemesterRegistration);

export const semesterRegistrationRouter = router;
