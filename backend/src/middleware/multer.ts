// backend/middleware/multer.ts
import multer from 'multer';

const storage = multer.memoryStorage(); // or use diskStorage if you prefer saving files

const upload = multer({ storage });

export default upload;
