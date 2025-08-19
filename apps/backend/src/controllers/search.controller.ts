
import { Request, Response, NextFunction } from 'express';
import * as searchService from '../services/search.service';

export const search = async (req: Request, res: Response, next: NextFunction) => {
    const q = req.query.q as string;
    if (!q) {
        return res.status(400).json({ message: 'Query parameter "q" is required' });
    }
    try {
        const results = await searchService.performSearch(q);
        res.json(results);
    } catch (error) {
        next(error);
    }
};
