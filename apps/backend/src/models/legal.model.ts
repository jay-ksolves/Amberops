
import mongoose, { Schema } from 'mongoose';
import type { LegalDocument as ILegalDocument } from '@amberops/lib';

const LegalSchema = new Schema<ILegalDocument>({
    type: { type: String, required: true, enum: ['terms', 'privacy'], unique: true },
    content: { type: String, required: true },
}, { timestamps: true });

export const Legal = mongoose.models.Legal || mongoose.model<ILegalDocument>('Legal', LegalSchema);
