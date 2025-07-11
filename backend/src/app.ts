import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import applicantRoutes from './routes/applicant.routes.js';
import jobRoutes from './routes/job.routes.js';
import screeningResultRoutes from './routes/screeningResult.routes.js';
import authRoutes from './routes/auth.routes.js'; // Importing the authentication routes
import protectedRoutes from './routes/protected.routes.js'; // Importing the protected routes
//import path from 'path';

//dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Route middlewares
app.use('/api/applicants', applicantRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/screening-results', screeningResultRoutes);
app.use('/api/auth', authRoutes); // Authentication routes for login and registration
app.use('/api/protected', protectedRoutes); // Auth-protected admin/user routes

export default app;
