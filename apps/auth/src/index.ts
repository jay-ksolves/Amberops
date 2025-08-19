
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from './config/passport';
import authRoutes from './routes/auth';
import { log } from '@amberops/lib';

const app = express();
const PORT = process.env.AUTH_PORT || 3002;

// Dynamically configure CORS
const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',');
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

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Session Middleware for Passport
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_default_session_secret',
    resave: false,
    saveUninitialized: false,
}));


// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("FATAL ERROR: MONGODB_URI is not defined.");
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => log('[Auth Service] Successfully connected to MongoDB.'))
  .catch(err => {
    console.error('Connection error', err);
    process.exit(1);
  });


// Routes
app.use('/api', authRoutes);

app.get('/', (req, res) => {
    res.send('AmberOps Auth Service is running.');
});


app.listen(PORT, () => {
  log(`[Auth Service] listening on port ${PORT}`);
});
