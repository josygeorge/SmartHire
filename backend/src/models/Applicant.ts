import mongoose from 'mongoose';

const applicantSchema = new mongoose.Schema({
  name: String,
  email: String,
  resumeText: String,
  createdAt: { type: Date, default: Date.now },
});

export const Applicant = mongoose.model('Applicant', applicantSchema);
