import express from 'express';
import validateRequest from '../../utils/validateRequest';
import {
  changePasswordValidation,
  loginValidationSchema,
} from './auth.validation';
import { authController } from './auth.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  authController.loginUser,
);

router.post(
  '/change-password',
  auth(['student', 'admin', 'faculty']),
  validateRequest(changePasswordValidation),
  authController.changePassword,
);

export const authRouter = router;
