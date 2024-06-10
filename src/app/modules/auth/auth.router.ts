import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { loginValidationSchema } from './auth.validation';
import { authController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  validateRequest(loginValidationSchema),
  authController.loginUser,
);

export const authRouter = router;
