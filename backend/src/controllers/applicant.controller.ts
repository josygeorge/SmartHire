import { Request, Response } from 'express';
import { Applicant } from '../models/Applicant.model';

export const getApplicants = async (_: Request, res: Response) => {
  const applicants = await Applicant.find();
  res.json(applicants);
};

export const createApplicant = async (req: Request, res: Response) => {
  const applicant = new Applicant(req.body);
  await applicant.save();
  res.status(201).json(applicant);
};

export const deleteApplicant = async (req: Request, res: Response) => {
  await Applicant.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
