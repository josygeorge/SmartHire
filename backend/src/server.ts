import { DOMParser } from 'xmldom';
(global as any).DOMParser = DOMParser; // <-- Add this at the very top

import app from './app';
import { connectDB } from './utils/db';

const PORT = process.env.PORT || 5050;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
});
