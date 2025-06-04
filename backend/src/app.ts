import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import applicantRoutes from './routes/applicant.routes';
import jobRoutes from './routes/job.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/applicants', applicantRoutes);
app.use('/api/jobs', jobRoutes);

export default app;
