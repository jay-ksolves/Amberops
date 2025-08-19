
import mongoose, { Schema } from 'mongoose';
import type { ActivityLog as IActivityLog } from '@amberops/lib';

const ActivityLogSchema = new Schema<IActivityLog>({
  userId: { type: String, required: true, index: true },
  user: { type: Object },
  action: { type: String, required: true },
  details: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
}, { strict: false });

export const ActivityLog = mongoose.models.ActivityLog || mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);

    