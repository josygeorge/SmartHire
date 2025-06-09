import mongoose from 'mongoose';

const screeningResultSchema = new mongoose.Schema({
  applicantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Applicant' },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  summary: String, // Condensed resume-to-job analysis
  analysis: String,
  score: Number, //(Optional, e.g., 7.5/10)
  strengths: [String], // Clear insights from AI
  weaknesses: [String], // For interview prep
  interviewQuestions: [String], // Personalized by AI
  createdAt: { type: Date, default: Date.now },
});

export const ScreeningResult = mongoose.model(
  'ScreeningResult',
  screeningResultSchema
);
