
import type { Model, Document } from 'mongoose';
import mongoose from 'mongoose';

// Service for finding all documents of a model without any user context.
export const findAll = async <T extends Document>(model: Model<T>): Promise<any[]> => {
    return model.find({}).lean();
};

// Service for finding a single document by its ID without user context.
export const findById = async <T extends Document>(model: Model<T>, id: string): Promise<any | null> => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    return model.findById(id).lean();
};
