import { Router } from 'express';
import { createJob, getJobs, deleteJob } from '../controllers/job.controller';

const router = Router();
router.post('/', createJob);
router.get('/', getJobs);
router.delete('/:id', deleteJob);
export default router;
