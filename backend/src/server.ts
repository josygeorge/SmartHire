import app from './app';
import { connectDB } from './utils/db';
//import open from 'open';

connectDB().then(() => {
  app.listen(process.env.PORT || 5000, async () => {
    const localhostUrl = `http://localhost:${process.env.PORT}`;
    console.log(`Server running on port ${localhostUrl}`);
    //await open(localhostUrl);
  });
});
