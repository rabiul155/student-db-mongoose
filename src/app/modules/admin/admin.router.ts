import express from 'express';
import { adminController } from './admin.controller';

const router = express.Router();

router.get('/', adminController.getAllAdmin);
router.route('/:id').get().patch().delete();

export const adminRouter = router;
