
import { Request, Response, NextFunction } from 'express';
import { findAll } from '../../services/public/public.service';
import { PricingTier } from '../../models/pricingTier.model';

export const getAllPricingTiers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tiers = await findAll(PricingTier);
        res.json(tiers);
    } catch (error) {
        next(error);
    }
};
