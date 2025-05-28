import { Request, Response } from 'express';
import { Applicant } from '../models/Applicant.model';

export const getApplicants = async (_: Request, res: Response) => {
  const applicants = await Applicant.find();
  res.json(applicants);
};

export const createApplicant = async (req: Request, res: Response) => {
  try {
    const applicant = new Applicant(req.body);
    await applicant.save();
    res.status(201).json(applicant);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to create applicant', details: error });
  }
};

export const deleteApplicant = async (req: Request, res: Response) => {
  await Applicant.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
