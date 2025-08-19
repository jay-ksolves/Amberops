
import mongoose, { Schema } from 'mongoose';
import type { PricingTier as IPricingTier } from '@amberops/lib';

// Public data, does not have a userId
const PricingTierSchema = new Schema<IPricingTier>({
    title: { type: String, required: true },
    price: { type: String, required: true },
    period: { type: String },
    description: { type: String, required: true },
    features: { type: [String], required: true },
    isFeatured: { type: Boolean, default: false },
});

export const PricingTier = mongoose.models.PricingTier || mongoose.model<IPricingTier>('PricingTier', PricingTierSchema);
