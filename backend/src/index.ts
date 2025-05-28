import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello ESM with TypeScript!');
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on ${process.env.PORT}`);
});
