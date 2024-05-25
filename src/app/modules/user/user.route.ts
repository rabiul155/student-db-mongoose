import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.get('/create-student', userController.createStudent);

export const userRoute = router;
