
import mongoose, { Schema } from 'mongoose';
import type { Task as ITask } from '@amberops/lib';

const TaskSchema = new Schema<ITask>({
    userId: { type: String, required: true, index: true },
    name: { type: String, required: true },
    status: { type: String, required: true },
    progress: { type: Number, default: 0 },
    startTime: { type: Date, default: Date.now },
}, { strict: false });

export const Task = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema);

    