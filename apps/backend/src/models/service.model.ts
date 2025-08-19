
import mongoose, { Schema } from 'mongoose';
import type { Service as IService } from '@amberops/lib';

const ServiceSchema = new Schema<IService>({
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    clusterId: { type: String, required: true },
}, { strict: false });

export const Service = mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema);

    