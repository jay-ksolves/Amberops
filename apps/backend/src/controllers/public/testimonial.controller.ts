
import { Request, Response, NextFunction } from 'express';
import { findAll } from '../../services/public/public.service';
import { Testimonial } from '../../models/testimonial.model';

export const getAllTestimonials = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const testimonials = await findAll(Testimonial);
        res.json(testimonials);
    } catch (error) {
        next(error);
    }
};
