
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Express Request type to include the user property
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}

const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[Auth Middleware] Checking auth for: ${req.originalUrl}`);
  const authHeader = req.headers.authorization;

  if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined.");
    return res.status(500).json({ message: 'Internal server error: JWT secret not configured.' });
  }

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7, authHeader.length);
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { id: string; role: string };
      req.user = { id: decoded.id, role: decoded.role };
      console.log(`[Auth Middleware] SUCCESS: User ${decoded.id} authenticated.`);
      next();
    } catch (error) {
      console.log('[Auth Middleware] FAILED: Invalid or expired token.');
      return res.status(401).json({ message: 'Invalid or expired token.' });
    }
  } else {
    console.log('[Auth Middleware] FAILED: Authorization header missing or incorrect.');
    return res.status(401).json({ message: 'Authorization header missing or incorrect.' });
  }
};
