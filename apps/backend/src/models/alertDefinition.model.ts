
import mongoose, { Schema } from 'mongoose';
import type { AlertDefinition as IAlertDefinition } from '@amberops/lib';

const AlertDefinitionSchema = new Schema<IAlertDefinition>({
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    service: { type: String, required: true },
    type: { type: String, required: true },
    enabled: { type: Boolean, default: true },
}, { strict: false });

export const AlertDefinition = mongoose.models.AlertDefinition || mongoose.model<IAlertDefinition>('AlertDefinition', AlertDefinitionSchema);

    