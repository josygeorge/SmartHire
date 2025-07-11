// src/types/express/index.d.ts
// This file extends the Express Request interface to include a user object
declare namespace Express {
  /* export interface Request { */ // This is the correct way to extend the Request interface in Express
  interface Request {
    user?: {
      id: string;
      role: 'admin' | 'user';
    };
  }
}
