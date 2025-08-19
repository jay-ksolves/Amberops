
import { PricingTier } from '../models/pricingTier.model';
import { Testimonial } from '../models/testimonial.model';
import { FAQ } from '../models/faq.model';
import mongoose from 'mongoose';
import type { PricingTier as IPricingTier, Testimonial as ITestimonial, FAQ as IFAQ } from '@amberops/lib';

// --- Service functions for PUBLIC, READ-ONLY access ---
// These functions do not require any user authentication or filtering.

export const findAllPricingTiers = async () => {
    return PricingTier.find({});
};

export const findAllTestimonials = async () => {
    return Testimonial.find({});
};

export const findAllFaqs = async () => {
    return FAQ.find({});
};


// --- Service functions for ADMIN/PROTECTED write access ---

export const createPricingTier = async (data: Omit<IPricingTier, 'id'>) => {
    const newTier = new PricingTier(data);
    await newTier.save();
    return newTier.toJSON();
};

export const updatePricingTier = async (id: string, data: Partial<IPricingTier>) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return PricingTier.findByIdAndUpdate(id, data, { new: true });
};

export const deletePricingTier = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return PricingTier.findByIdAndDelete(id);
};


export const createTestimonial = async (data: Omit<ITestimonial, 'id'>) => {
    const newTestimonial = new Testimonial(data);
    await newTestimonial.save();
    return newTestimonial.toJSON();
};

export const updateTestimonial = async (id: string, data: Partial<ITestimonial>) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Testimonial.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTestimonial = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return Testimonial.findByIdAndDelete(id);
};


export const createFaq = async (data: Omit<IFAQ, 'id'>) => {
    const newFaq = new FAQ(data);
    await newFaq.save();
    return newFaq.toJSON();
};

export const updateFaq = async (id: string, data: Partial<IFAQ>) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return FAQ.findByIdAndUpdate(id, data, { new: true });
};

export const deleteFaq = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return FAQ.findByIdAndDelete(id);
};
