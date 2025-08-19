
import mongoose, { Schema } from 'mongoose';
import type { Alert as IAlert } from '@amberops/lib';

const AlertSchema = new Schema<IAlert>({
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    severity: { type: String, required: true },
    status: { type: String, required: true },
    clusterId: { type: String, required: true },
    clusterName: { type: String, required: true },
    serviceName: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
}, { strict: false });

export const Alert = mongoose.models.Alert || mongoose.model<IAlert>('Alert', AlertSchema);

    