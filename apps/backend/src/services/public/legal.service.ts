
import { Legal } from '../../models/legal.model';

export const findLegalDocument = async (type: 'terms' | 'privacy') => {
    return Legal.findOne({ type }).lean();
};
