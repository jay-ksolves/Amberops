
import { Router } from 'express';
import * as hostController from '../../controllers/host.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Hosts
 *   description: Host management
 */

/**
 * @swagger
 * /app/hosts:
 *   get:
 *     summary: Retrieve a list of all hosts
 *     tags: [Hosts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of hosts.
 */
router.get('/', hostController.getAll);

/**
 * @swagger
 * /app/hosts/{id}:
 *   get:
 *     summary: Get a host by ID
 *     tags: [Hosts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The host ID
 *     responses:
 *       200:
 *         description: A single host object.
 *       404:
 *         description: Host not found.
 */
router.get('/:id', hostController.getById);

export default router;
