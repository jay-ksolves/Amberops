
import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import passport from 'passport';
import { log } from '@amberops/lib';

const router = Router();
const homeUrl = process.env.NEXT_PUBLIC_HOME_URL || 'http://localhost:3001';
const webUrl = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';
const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3003';

// This function creates the user object for the JWT and redirect.
// It explicitly omits the password.
const getUserPayload = (user: IUser) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
  avatar: user.avatar,
});

// POST /api/register
router.post('/register', async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        
        if (process.env.LOGGING_ENABLED === 'true') {
            log(`[Auth Service] Registration attempt for email: ${email}`);
        }

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'Viewer', // Default to Viewer if no role is provided
            avatar: `https://avatar.vercel.sh/${email}`,
            lastLogin: new Date(),
        });

        await newUser.save();
        
        const userPayload = getUserPayload(newUser);

        res.status(201).json({ message: 'User registered successfully', user: userPayload });

    } catch(error: any) {
         if (process.env.LOGGING_ENABLED === 'true') {
            log(`[Auth Service] Server error during registration: ${error.message}`);
        }
        res.status(500).json({ message: 'Server error during registration.' });
    }
});


// POST /api/login - Handles standard form submission from client-side JS
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (process.env.LOGGING_ENABLED === 'true') {
        log(`[Auth Service] Login attempt for email: ${email}`);
    }

    if (!email || !password) {
      return res.status(400).json({ message: 'Please enter all fields.' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        if (process.env.LOGGING_ENABLED === 'true') {
            log(`[Auth Service] Login failed: User not found for email: ${email}`);
        }
        return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
       if (process.env.LOGGING_ENABLED === 'true') {
            log(`[Auth Service] Login failed: Password mismatch for email: ${email}`);
        }
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    user.lastLogin = new Date();
    await user.save();

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined.');
    }
    
    const userPayload = getUserPayload(user);
    const token = jwt.sign(userPayload, jwtSecret, { expiresIn: '1h' });

    // Determine the redirect URL based on user role
    const destinationUrl = user.role === 'Admin' ? adminUrl : webUrl;
    
    // Set the JWT as an HttpOnly cookie
    res.cookie('amberops_jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000, // 1 hour
        path: '/',
        domain: process.env.COOKIE_DOMAIN || 'localhost',
    });
    
    // Also respond with the token and the destination URL for client-side routing.
    res.status(200).json({ token, redirectUrl: destinationUrl });

  } catch (error: any) {
    if (process.env.LOGGING_ENABLED === 'true') {
        log(`[Auth Service] Server error during login: ${error.message}`);
    }
    res.status(500).json({ message: 'Server error during login.' });
  }
});


// OAuth routes now redirect with the token.
// The /auth page will handle parsing this and redirecting.
const handleOAuthCallback = (req: Request, res: Response) => {
    const user = req.user as IUser;
    if (!user) {
        return res.redirect(`${homeUrl}/auth?error=auth_failed`);
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error('JWT_SECRET is not defined.');
        return res.redirect(`${homeUrl}/auth?error=server_error`);
    }
    
    const userPayload = getUserPayload(user);
    const token = jwt.sign(userPayload, jwtSecret, { expiresIn: '1h' });
    
    const destinationUrl = user.role === 'Admin' ? adminUrl : webUrl;

    // Set the JWT as an HttpOnly cookie
    res.cookie('amberops_jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 3600000, // 1 hour
        path: '/',
        domain: process.env.COOKIE_DOMAIN || 'localhost',
    });
    
    // Redirect to the final destination with the token in the query param
    // for the client to grab and store in localStorage
    res.redirect(`${destinationUrl}/dashboard?token=${token}`);
};

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { 
    failureRedirect: `${homeUrl}/auth?error=google_failed`,
    session: false, 
}), handleOAuthCallback);

router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback', passport.authenticate('github', { 
    failureRedirect: `${homeUrl}/auth?error=github_failed`,
    session: false,
}), handleOAuthCallback);

export default router;
