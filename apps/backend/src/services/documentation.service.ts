
import { Documentation } from '../models/documentation.model';
import type { DocumentationArticle } from '@amberops/lib';

export const findAllArticles = async () => {
    return Documentation.find({});
};

export const findArticleBySlug = async (slug: string) => {
    return Documentation.findOne({ slug });
}

export const createArticle = async (articleData: Omit<DocumentationArticle, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newArticle = new Documentation(articleData);
    await newArticle.save();
    return newArticle.toJSON();
};

export const updateArticle = async (slug: string, articleData: Partial<DocumentationArticle>) => {
    return Documentation.findOneAndUpdate({ slug }, articleData, { new: true });
};

export const deleteArticle = async (slug: string) => {
    return Documentation.findOneAndDelete({ slug });
};
