import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import applicantRoutes from './routes/applicant.routes';
import jobRoutes from './routes/job.routes';
import screeningResultRoutes from './routes/screeningResult.routes';
import protectedRoutes from './routes/protected.routes'; // Importing the protected routes

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Route middlewares
app.use('/api/applicants', applicantRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/screening-results', screeningResultRoutes);
app.use('/api/protected', protectedRoutes); // Auth-protected admin/user routes

export default app;
