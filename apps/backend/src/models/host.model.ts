
import mongoose, { Schema } from 'mongoose';
import type { Host as IHost } from '@amberops/lib';

const HostSchema = new Schema<IHost>({
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    clusterId: { type: String, required: true },
}, { strict: false });

export const Host = mongoose.models.Host || mongoose.model<IHost>('Host', HostSchema);

    