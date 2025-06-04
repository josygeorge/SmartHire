import { Router } from 'express';
import {
  createScreeningResult,
  getScreeningResults,
} from '../controllers/screeningResult.controller';

const router = Router();
router.post('/', createScreeningResult);
router.get('/', getScreeningResults);
export default router;
