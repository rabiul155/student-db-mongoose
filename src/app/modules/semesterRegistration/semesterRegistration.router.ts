import express from 'express';
import { semesterRegistrationController } from './semesterRegistration.controller';
import validateRequest from '../../utils/validateRequest';
import {
  semesterRegistrationValidationSchema,
  updateSemesterRegistrationValidationSchema,
} from './semesterRegistration.validation';

const router = express.Router();

router
  .route('/')
  .post(
    validateRequest(semesterRegistrationValidationSchema),
    semesterRegistrationController.createSemesterRegistration,
  )
  .get(semesterRegistrationController.getAllSemesterRegistration);

router
  .route('/:id')
  .get(semesterRegistrationController.getSingleSemesterRegistration)
  .patch(
    validateRequest(updateSemesterRegistrationValidationSchema),
    semesterRegistrationController.updateSemesterRegistration,
  )
  .delete(semesterRegistrationController.deleteSemesterRegistration);

export const semesterRegistrationRouter = router;
