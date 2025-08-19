
import { Router } from 'express';
import * as documentationController from '../../controllers/documentation.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Documentation
 *   description: Documentation article management
 */

/**
 * @swagger
 * /documentation:
 *   get:
 *     summary: Retrieve a list of all documentation articles
 *     tags: [Documentation]
 *     responses:
 *       200:
 *         description: A list of articles.
 */
router.get('/', documentationController.getAllArticles);

/**
 * @swagger
 * /documentation:
 *   post:
 *     summary: Create a new documentation article
 *     tags: [Documentation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               slug:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: The created article.
 */
router.post('/', documentationController.createArticle);

/**
 * @swagger
 * /documentation/{slug}:
 *   put:
 *     summary: Update an article by slug
 *     tags: [Documentation]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The article slug
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: The updated article.
 */
router.put('/:slug', documentationController.updateArticle);

/**
 * @swagger
 * /documentation/{slug}:
 *   delete:
 *     summary: Delete an article by slug
 *     tags: [Documentation]
 *     parameters:
 *       - in: path
 *         name: slug
 *         schema:
 *           type: string
 *         required: true
 *         description: The article slug
 *     responses:
 *       204:
 *         description: Article deleted successfully.
 */
router.delete('/:slug', documentationController.deleteArticle);

export default router;
