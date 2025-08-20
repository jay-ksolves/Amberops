
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger';
import appRouter from './api/index';
import publicRouter from './api/public.router';
import { errorHandler } from './utils/error-handler';
import { authMiddleware } from './middleware/auth.middleware';

// Global Mongoose settings for toJSON and toObject transformations
const transform = (doc: any, ret: { [key: string]: any }) => {
  ret.id = ret._id?.toString();
  delete ret._id;
  delete ret.__v;
  // Note: We are not deleting the password hash here because it's already excluded by `select: false` in the schema.
};

mongoose.set('toJSON', {
  virtuals: true,
  transform,
});

mongoose.set('toObject', {
  virtuals: true,
  transform,
});


const app = express();
// Use the BACKEND_PORT from environment variables, falling back to 3004 for local dev.
const PORT = parseInt(process.env.BACKEND_PORT || '3004', 10);

// Dynamically configure CORS
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim().replace(/\/$/, '')); // Trim whitespace and remove trailing slashes

const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
};

// Basic security middleware
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());

// Add a simple logger middleware
app.use((req, res, next) => {
    console.log(`[Backend Entry] Received request: ${req.method} ${req.url}`);
    next();
});

// Rate limiting - ONLY for protected application routes
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	standardHeaders: true, 
	legacyHeaders: false, 
    message: 'Too many requests, please try again later.',
});


// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("FATAL ERROR: MONGODB_URI is not defined.");
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Backend successfully connected to MongoDB.'))
  .catch(err => {
    console.error('Backend connection error', err);
    process.exit(1);
  });

// Swagger API Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// --- API Routes ---
// Public routes - NO authentication or rate limiting
app.use('/api/v1/public', publicRouter); 

// Protected routes - REQUIRE authentication and are rate limited
app.use('/api/v1/app', authMiddleware, apiLimiter, appRouter);

app.get('/', (req, res) => {
    res.send('AmberOps Backend Service is running. Visit /api-docs for API documentation.');
});

// 404 Handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: "Not Found" });
});

// Centralized error handler
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`AmberOps Backend Service listening on port ${PORT}`);
});
