
import { Request, Response, NextFunction } from 'express';
import * as documentationService from '../../services/public/documentation.service';

export const getAllArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const articles = await documentationService.findAllArticles();
        res.json(articles);
    } catch (error) {
        next(error);
    }
};
