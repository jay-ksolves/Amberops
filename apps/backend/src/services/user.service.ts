
import { User } from '../models/user.model';
import bcrypt from 'bcryptjs';
import type { User as IUserType } from '@amberops/lib';
import mongoose from 'mongoose';

const toResponse = (doc: any) => {
    if (!doc) return null;
    const ret = doc.toObject ? doc.toObject() : { ...doc };
    if (ret._id) {
        ret.id = ret._id.toString();
        delete ret._id;
    }
    delete ret.__v;
    delete ret.password; 
    return ret;
}


export const findAllUsers = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
};

export const findUserById = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    const user = await User.findById(id);
    return toResponse(user);
};

export const createUser = async (userData: any) => {
    if (userData.password) {
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);
    }
    if(userData.email && !userData.avatar) {
        userData.avatar = `https://avatar.vercel.sh/${userData.email}`;
    }
    const newUser = new User(userData);
    await newUser.save();
    return toResponse(newUser);
};

export const updateUser = async (id: string, userData: Partial<IUserType>) => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
    return toResponse(updatedUser);
};

export const deleteUser = async (id: string) => {
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }
    const deletedUser = await User.findByIdAndDelete(id);
    return toResponse(deletedUser);
};
