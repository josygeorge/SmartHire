import express, { Request, Response } from 'express';
const app = express();
const port = 3003;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.listen(port, () => {
  console.log(`App listening on PORT ${port}`);
});
