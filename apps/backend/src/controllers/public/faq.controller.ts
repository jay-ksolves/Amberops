
import { Request, Response, NextFunction } from 'express';
import { findAll } from '../../services/public/public.service';
import { FAQ } from '../../models/faq.model';

export const getAllFaqs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const faqs = await findAll(FAQ);
        res.json(faqs);
    } catch (error) {
        next(error);
    }
};
