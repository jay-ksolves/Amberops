
import mongoose, { Schema } from 'mongoose';
import type { Testimonial as ITestimonial } from '@amberops/lib';

// Public data, does not have a userId
const TestimonialSchema = new Schema<ITestimonial>({
    name: { type: String, required: true },
    role: { type: String, required: true },
    quote: { type: String, required: true },
    avatar: { type: String },
});

export const Testimonial = mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
