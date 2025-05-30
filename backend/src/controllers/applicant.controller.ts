import { Request, Response } from 'express';
import { Applicant } from '../models/Applicant.model';
// This type matches the shape Multer adds to Express.Request
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}
export const getApplicants = async (_: Request, res: Response) => {
  const applicants = await Applicant.find();
  res.json(applicants);
};

/* export const createApplicant = async (req: Request, res: Response) => {
  try {
    const applicant = new Applicant(req.body);
    await applicant.save();
    res.status(201).json(applicant);
  } catch (error) {
    res
      .status(400)
      .json({ error: 'Failed to create applicant', details: error });
  }
}; */

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

    // Extract text from the file (placeholder – you can enhance this)
    const resumeText = req.file.buffer.toString('utf-8');
    console.log({ name, email, resumeText });
    const applicant = new Applicant({
      name,
      email,
      resumeText,
    });
    const saved = await applicant.save();
    console.log('Saved to MongoDB:', saved); // ✅ log the saved doc

    res.status(201).json({ applicant: saved });
    /* await applicant.save();
    res.status(201).json({ applicant }); */
  } catch (error) {
    console.error('Save error:', error); // 👈 Add this
    res
      .status(400)
      .json({ error: 'Failed to create applicant', details: error });
  }
};

export const deleteApplicant = async (req: Request, res: Response) => {
  await Applicant.findByIdAndDelete(req.params.id);
  res.status(204).send();
};
