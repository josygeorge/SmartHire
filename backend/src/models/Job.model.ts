import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  skills: [String], // <--- ADD THIS
  experienceLevel: String,
  location: String,
  createdAt: { type: Date, default: Date.now },
});

export const Job = mongoose.model('Job', jobSchema);
