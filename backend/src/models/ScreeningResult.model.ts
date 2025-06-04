import mongoose from 'mongoose';

const screeningResultSchema = new mongoose.Schema({
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant' },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  analysis: String,
  score: Number, //(Optional, e.g., 7.5/10)
  createdAt: { type: Date, default: Date.now },
});

export const ScreeningResult = mongoose.model(
  'ScreeningResult',
  screeningResultSchema
);
