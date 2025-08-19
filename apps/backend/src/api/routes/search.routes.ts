
import { Router } from 'express';
import * as searchController from '../../controllers/search.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Global search functionality
 */

/**
 * @swagger
 * /app/search:
 *   get:
 *     summary: Perform a global search across clusters, services, and hosts
 *     tags: [Search]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: The search query
 *     responses:
 *       200:
 *         description: Search results.
 */
router.get('/', searchController.search);

export default router;
