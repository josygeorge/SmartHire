import { Request, Response } from 'express';
import { ScreeningResult } from '../models/ScreeningResult.model';
import { Applicant } from '../models/Applicant.model';
import { Job } from '../models/Job.model';
import fetch from 'node-fetch'; // or axios

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

// AI integration
// Run Screening
export const runScreening = async (req: Request, res: Response) => {
  try {
    const { applicantId, jobId } = req.body;

    const applicant = await Applicant.findById(applicantId);
    const job = await Job.findById(jobId);

    if (!applicant || !job)
      return res.status(404).json({ message: 'Applicant or job not found' });

    const prompt = `
Given this resume: ${applicant.resumeText}
And this job description: ${job.description}
Provide a match score (0–100), a short summary, key strengths, weaknesses, and 3 interview questions.
Return response in JSON format with keys: score, summary, strengths, weaknesses, questions.
    `;

    const response = await fetch(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistral/mixtral-8x7b-instruct',
          messages: [{ role: 'user', content: prompt }],
        }),
      }
    );

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);

    const newResult = await ScreeningResult.create({
      applicant: applicant._id,
      job: job._id,
      score: parsed.score,
      summary: parsed.summary,
      strengths: parsed.strengths,
      weaknesses: parsed.weaknesses,
      interviewQuestions: parsed.questions,
    });

    res.status(201).json(newResult);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error running screening' });
  }
};
