// Protected Routes for Admin vs User

import { Router } from 'express';
import { authenticate, authorizeAdmin } from '../middleware/authMiddleware';

const router = Router();

import { Request, Response, NextFunction } from 'express';

router.get(
  '/admin',
  authenticate,
  authorizeAdmin,
  (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Welcome Admin', user: (req as any).user });
  }
);

router.get(
  '/user',
  authenticate,
  (req: Request, res: Response, next: NextFunction) => {
    res.json({ message: 'Welcome User', user: (req as any).user });
  }
);

export default router;
// This router handles protected routes for both admin and user roles.
// It uses the `authenticate` middleware to verify the JWT token and the `authorizeAdmin` middleware to restrict access to admin routes.
// The `/admin` route is accessible only to users with the 'admin' role, while the `/user` route is accessible to all authenticated users.
// The `authenticate` middleware checks for a valid JWT token and attaches the user information to the request object.
// The `authorizeAdmin` middleware checks if the user has the 'admin' role before allowing access to the admin route.
// The responses include a welcome message and the user information, which is derived from the JWT token.
// This setup allows for role-based access control in your Express application, ensuring that only authorized users can access specific routes based on their roles.
// The router is exported for use in the main application file, where it can be mounted on a specific path (e.g., `/api/protected`).
// This code defines protected routes for an Express application, allowing access based on user roles (admin or user).
// It uses middleware for authentication and authorization, ensuring that only users with the appropriate roles can access certain endpoints.
