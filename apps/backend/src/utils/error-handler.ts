
import { Request, Response, NextFunction } from 'express';

interface AppError extends Error {
    statusCode?: number;
    isOperational?: boolean;
}

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error';

    // Log the error for debugging purposes
    console.error(err);

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        err.statusCode = 400;
    }

    res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
        // Include stack trace in development only
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};
