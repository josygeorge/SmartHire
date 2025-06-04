import { Request, Response } from 'express';
import { Job } from '../models/Job.model';

export const createJob = async (req: Request, res: Response) => {
  try {
    const job = new Job(req.body);
    const saved = await job.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ error: 'Job creation failed', details: error });
  }
};

export const getJobs = async (_: Request, res: Response) => {
  const jobs = await Job.find();
  res.json(jobs);
};

export const deleteJob = async (req: Request, res: Response) => {
  await Job.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
