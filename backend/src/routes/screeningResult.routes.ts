import { Router } from 'express';
import {
  createScreeningResult,
  deleteOrphanedScreeningResults,
  getScreeningResults,
  runAIForScreeningResult,
} from '../controllers/screeningResult.controller';

//const router = Router();
const router: Router = Router();
router.post('/', createScreeningResult);
router.get('/', getScreeningResults);
router.post('/run', runAIForScreeningResult);
router.delete('/orphaned', deleteOrphanedScreeningResults); // New route for deletion

export default router;
