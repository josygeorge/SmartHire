import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import open from 'open';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('SmartHire backend is running');
});

// Connect MongoDb and start server

const startServer = async () => {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error('MONGO_URI is not defined');
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 5000, async () => {
      const localhostUrl = `http://localhost:${process.env.PORT}`;
      console.log(`Server running on port ${localhostUrl}`);
      await open(localhostUrl);
    });
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

startServer();
