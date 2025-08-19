
import { Router } from 'express';
import * as serviceController from '../../controllers/service.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Service management
 */

/**
 * @swagger
 * /app/services:
 *   get:
 *     summary: Retrieve a list of all services
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of services.
 */
router.get('/', serviceController.getAll);

/**
 * @swagger
 * /app/services/{id}:
 *   get:
 *     summary: Get a service by ID
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The service ID
 *     responses:
 *       200:
 *         description: A single service object.
 *       404:
 *         description: Service not found.
 */
router.get('/:id', serviceController.getById);

export default router;
