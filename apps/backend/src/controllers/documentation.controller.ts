
import { Request, Response, NextFunction } from 'express';
import * as documentationService from '../services/documentation.service';

export const getAllArticles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const articles = await documentationService.findAllArticles();
        res.json(articles);
    } catch (error) {
        next(error);
    }
};

export const getArticleBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const article = await documentationService.findArticleBySlug(req.params.slug);
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(article);
    } catch (error) {
        next(error);
    }
}

export const createArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newArticle = await documentationService.createArticle(req.body);
        res.status(201).json(newArticle);
    } catch (error) {
         next(error);
    }
};

export const updateArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedArticle = await documentationService.updateArticle(req.params.slug, req.body);
        if (!updatedArticle) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.json(updatedArticle);
    } catch (error) {
        next(error);
    }
};

export const deleteArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await documentationService.deleteArticle(req.params.slug);
        if (!result) {
            return res.status(404).json({ message: 'Article not found' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
