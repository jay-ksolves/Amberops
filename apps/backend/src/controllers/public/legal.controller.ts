
import { Request, Response, NextFunction } from 'express';
import * as legalService from '../../services/public/legal.service';

export const getLegalDocument = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const doc = await legalService.findLegalDocument(req.params.type as 'terms' | 'privacy');
        if (!doc) {
            return res.status(404).json({ message: 'Document not found' });
        }
        res.json(doc);
    } catch (error) {
        next(error);
    }
};
