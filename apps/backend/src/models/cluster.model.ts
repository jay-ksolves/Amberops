
import mongoose, { Schema } from 'mongoose';
import type { Cluster as ICluster } from '@amberops/lib';

// Use strict: false to allow for any structure, as per original design.
const ClusterSchema = new Schema<ICluster>({
    userId: { type: String, required: true, index: true },
}, { strict: false });

export const Cluster = mongoose.models.Cluster || mongoose.model<ICluster>('Cluster', ClusterSchema);
