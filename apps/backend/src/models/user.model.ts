
import mongoose, { Schema } from 'mongoose';
import type { User as IUserType } from '@amberops/lib';

// Extend the shared User type for Mongoose
export interface IUser extends Omit<IUserType, 'id'>, mongoose.Document {}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Admin', 'Operator', 'Viewer'], default: 'Viewer' },
  avatar: { type: String },
  lastLogin: { type: Date, default: Date.now },
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
