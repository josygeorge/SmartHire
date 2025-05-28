import { Router } from 'express';
import {
  getApplicants,
  createApplicant,
  deleteApplicant,
} from '../controllers/applicant.controller';

const router = Router();

router.get('/', getApplicants);
router.post('/', createApplicant);
router.delete('/:id', deleteApplicant);

export default router;
