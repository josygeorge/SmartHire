import { Router } from 'express';
import {
  createJob,
  getJobs,
  deleteJob,
  updateJob,
} from '../controllers/job.controller.js';

const router = Router();
router.post('/', createJob);
router.get('/', getJobs);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);
export default router;
