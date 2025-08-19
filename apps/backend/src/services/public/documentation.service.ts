
import { Documentation } from '../../models/documentation.model';

export const findAllArticles = async () => {
    return Documentation.find({}).lean();
};
