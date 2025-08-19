
import mongoose, { Schema } from 'mongoose';
import type { FAQ as IFAQ } from '@amberops/lib';

// Public data, does not have a userId
const FaqSchema = new Schema<IFAQ>({
    question: { type: String, required: true },
    answer: { type: String, required: true },
});

export const FAQ = mongoose.models.FAQ || mongoose.model<IFAQ>('FAQ', FaqSchema);
