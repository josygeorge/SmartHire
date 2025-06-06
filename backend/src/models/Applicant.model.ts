import mongoose from 'mongoose';

const applicantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  resumeText: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Applicant = mongoose.model('Applicant', applicantSchema);
