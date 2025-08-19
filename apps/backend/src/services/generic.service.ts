
import type { Model, Document } from 'mongoose';
import mongoose from 'mongoose';

// A helper function to safely transform the document
const toResponse = (doc: any) => {
    if (!doc) return null;
    const ret = doc.toObject ? doc.toObject() : { ...doc };
    // The global transform now handles this, but we keep it here for safety.
    if (ret._id) {
        ret.id = ret._id.toString();
        delete ret._id;
    }
    delete ret.__v;
    return ret;
}

// A helper to check if a model has a 'userId' field in its schema
const hasUserId = (model: Model<any>): boolean => {
    return model.schema.path('userId') !== undefined;
}

export const findAll = async <T extends Document>(model: Model<T>, userId?: string): Promise<any[]> => {
    const query = hasUserId(model) && userId ? { userId: userId } : {};
    const items = await model.find(query); 
    return items.map(item => item.toJSON());
};

export const findById = async <T extends Document>(model: Model<T>, id: string, userId?: string): Promise<any | null> => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    const query: any = { _id: new mongoose.Types.ObjectId(id) };
    if (hasUserId(model) && userId) {
        query.userId = userId;
    }
    const item = await model.findOne(query);
    return item ? item.toJSON() : null;
};

export const create = async <T extends Document>(model: Model<T>, data: any, userId?: string): Promise<any> => {
    const dataWithUser = { ...data };
    if (hasUserId(model) && userId) {
        dataWithUser.userId = userId;
    }
    const newItem = new model(dataWithUser);
    await newItem.save();
    return toResponse(newItem);
};

export const update = async <T extends Document>(model: Model<T>, id: string, data: any, userId?: string): Promise<any | null> => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    const query: any = { _id: new mongoose.Types.ObjectId(id) };
    if (hasUserId(model) && userId) {
        query.userId = userId;
    }
    const updatedItem = await model.findOneAndUpdate(query, data, { new: true });
    return updatedItem ? updatedItem.toJSON() : null;
};

export const deleteById = async <T extends Document>(model: Model<T>, id: string, userId?: string): Promise<any | null> => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
     const query: any = { _id: new mongoose.Types.ObjectId(id) };
    if (hasUserId(model) && userId) {
        query.userId = userId;
    }
    const deletedItem = await model.findOneAndDelete(query);
    return deletedItem ? deletedItem.toJSON() : null;
};

    
