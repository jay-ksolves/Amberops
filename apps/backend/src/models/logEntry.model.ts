
import mongoose, { Schema } from 'mongoose';
import type { LogEntry as ILogEntry } from '@amberops/lib';

const LogEntrySchema = new Schema<ILogEntry>({}, { strict: false });

export const LogEntry = mongoose.models.LogEntry || mongoose.model<ILogEntry>('LogEntry', LogEntrySchema);
