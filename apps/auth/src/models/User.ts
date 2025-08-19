
import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for the Mongoose document
export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'Admin' | 'Operator' | 'Viewer';
  avatar?: string;
  lastLogin: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['Admin', 'Operator', 'Viewer'], default: 'Viewer' },
  avatar: { type: String },
  lastLogin: { type: Date, default: Date.now },
}, { timestamps: true });


export default mongoose.model<IUser>('User', UserSchema);
