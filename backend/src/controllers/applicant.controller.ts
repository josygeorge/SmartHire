import { Request, Response } from 'express';
import { Applicant } from '../models/Applicant.model';
import pdfParse from 'pdf-parse';

// This type matches the shape Multer adds to Express.Request
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
export const getApplicants = async (_: Request, res: Response) => {
  const applicants = await Applicant.find();
  res.json(applicants);
};

// CREATE APPLICANT - implementing MULTER for file upload (pdf and txt)
export const createApplicant = async (
  req: MulterRequest,
  res: Response
): Promise<void> => {
  try {
    const { name, email } = req.body;

    if (!req.file) {
      res.status(400).json({ error: 'No resume file uploaded.' });
      return;
    }

    const { buffer, mimetype } = req.file;
    let resumeText = '';

    if (mimetype === 'text/plain') {
      resumeText = buffer.toString('utf-8');
    } else if (mimetype === 'application/pdf') {
      const result = await pdfParse(req.file.buffer);
      // 👇 dynamically import pdf-parse (ESM-safe)
      /* const pdfParse = (await import('pdf-parse')).default; // ✅ FIXED
      const result = await pdfParse(buffer); */
      resumeText = result.text;
    } else {
      res.status(400).json({ error: 'Unsupported file format.' });
      return;
    }
    const applicant = new Applicant({
      name,
      email,
      resumeText,
    });

    const saved = await applicant.save();
    console.log('Saved to MongoDB:', saved);

    res.status(201).json({ applicant: saved });
  } catch (error) {
    console.error('Save error:', error);
    res.status(400).json({
      error: 'Failed to create applicant',
      details: error instanceof Error ? error.message : error,
    });
  }
};

export const deleteApplicant = async (req: Request, res: Response) => {
  await Applicant.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
