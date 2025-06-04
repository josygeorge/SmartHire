import { Request, Response } from 'express';
import { ScreeningResult } from '../models/ScreeningResult.model';

/*The createScreeningResult controller is designed 
to save screening results generated autonomously by the AI agent 
— not through a manual form submission by a human*/

export const createScreeningResult = async (req: Request, res: Response) => {
  try {
    const result = new ScreeningResult(req.body);
    const saved = await result.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'ScreeningResult creation failed', details: error });
  }
};

export const getScreeningResults = async (_: Request, res: Response) => {
  const results = await ScreeningResult.find()
    .populate('applicantId', 'name email')
    .populate('jobId', 'title description')
    .sort({ createdAt: -1 });
  res.json(results);
};
