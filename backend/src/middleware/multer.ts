// backend/middleware/multer.ts
import multer from 'multer';

const storage = multer.memoryStorage(); // or use diskStorage if you prefer saving files

const upload = multer({
  storage,
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'text/plain') {
      cb(null, true);
    } else {
      cb(new Error('Only .pdf and .txt files are allowed'));
    }
  },
});

export default upload;
