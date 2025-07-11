import { Router } from 'express';
import {
  getApplicants,
  createApplicant,
  deleteApplicant,
} from '../controllers/applicant.controller.js';
import upload from '../middleware/multer.js'; // Importing multer middleware

const router = Router();

router.get('/', getApplicants);
//router.post('/', createApplicant);
router.post('/', upload.single('resume'), createApplicant); // 👈 Use multer here
router.delete('/:id', deleteApplicant);
export default router;
