import { Router } from 'express';
import {
  createScreeningResult,
  getScreeningResults,
  runAIForScreeningResult,
} from '../controllers/screeningResult.controller';

//const router = Router();
const router: Router = Router();
router.post('/', createScreeningResult);
router.get('/', getScreeningResults);
router.post('/run', runAIForScreeningResult);
/* router.post('/run', async (req, res) =>
  console.log('Received resume analysis request')
); */

export default router;
