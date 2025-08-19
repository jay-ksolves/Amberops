
import { Request, Response, NextFunction } from 'express';
import * as publicService from '../services/public.service';

// --- Publicly Readable Data ---

export const getAllPricingTiers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await publicService.findAllPricingTiers();
        res.json(items);
    } catch (error) {
        next(error);
    }
};

export const getAllTestimonials = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await publicService.findAllTestimonials();
        res.json(items);
    } catch (error) {
        next(error);
    }
};

export const getAllFaqs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = await publicService.findAllFaqs();
        res.json(items);
    } catch (error) {
        next(error);
    }
};


// --- Admin/Protected Write Operations for Public Data ---

export const createPricingTier = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newItem = await publicService.createPricingTier(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};

export const updatePricingTier = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedItem = await publicService.updatePricingTier(req.params.id, req.body);
        if (!updatedItem) {
            return res.status(404).json({ message: 'Pricing Tier not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        next(error);
    }
};

export const deletePricingTier = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedItem = await publicService.deletePricingTier(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Pricing Tier not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};


export const createTestimonial = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newItem = await publicService.createTestimonial(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};

export const updateTestimonial = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedItem = await publicService.updateTestimonial(req.params.id, req.body);
        if (!updatedItem) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        next(error);
    }
};

export const deleteTestimonial = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedItem = await publicService.deleteTestimonial(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

export const createFaq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newItem = await publicService.createFaq(req.body);
        res.status(201).json(newItem);
    } catch (error) {
        next(error);
    }
};

export const updateFaq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedItem = await publicService.updateFaq(req.params.id, req.body);
        if (!updatedItem) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.json(updatedItem);
    } catch (error) {
        next(error);
    }
};

export const deleteFaq = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const deletedItem = await publicService.deleteFaq(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
