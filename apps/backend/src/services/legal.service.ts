
import { Legal } from '../models/legal.model';
import type { LegalDocument } from '@amberops/lib';

export const findLegalDocument = async (type: 'terms' | 'privacy') => {
    return Legal.findOne({ type });
};

export const updateLegalDocument = async (type: 'terms' | 'privacy', data: { content: string }) => {
    return Legal.findOneAndUpdate({ type }, data, { new: true, upsert: true });
};
