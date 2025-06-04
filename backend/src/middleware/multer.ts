// backend/middleware/multer.ts
import multer from 'multer';

/* Multer simplifies file management in Node.js applications by offering 
an easy-to-use interface for handling file uploads, validations, and storage, 
which is crucial for building applications that allow users to upload files.
 */

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
