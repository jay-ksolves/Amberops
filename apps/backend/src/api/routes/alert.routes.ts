
import { Router } from 'express';
import * as alertController from '../../controllers/alert.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Alerts
 *   description: Triggered alerts management
 */

/**
 * @swagger
 * /app/alerts:
 *   get:
 *     summary: Retrieve a list of all alerts
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of alerts.
 */
router.get('/', alertController.getAll);

/**
 * @swagger
 * /app/alerts/{id}:
 *   get:
 *     summary: Get an alert by ID
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The alert ID
 *     responses:
 *       200:
 *         description: A single alert object.
 *       404:
 *         description: Alert not found.
 */
router.get('/:id', alertController.getById);

/**
 * @swagger
 * /app/alerts/{id}:
 *   put:
 *     summary: Update an alert by ID (e.g., to acknowledge or resolve)
 *     tags: [Alerts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The alert ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [acknowledged, resolved]
 *     responses:
 *       200:
 *         description: The updated alert.
 *       404:
 *         description: Alert not found.
 */
router.put('/:id', alertController.update);

export default router;
