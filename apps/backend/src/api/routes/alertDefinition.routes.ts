
import { Router } from 'express';
import * as alertDefinitionController from '../../controllers/alertDefinition.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Alert Definitions
 *   description: Management of alert definitions
 */

/**
 * @swagger
 * /app/alert-definitions:
 *   get:
 *     summary: Retrieve a list of all alert definitions
 *     tags: [Alert Definitions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of alert definitions.
 */
router.get('/', alertDefinitionController.getAll);

/**
 * @swagger
 * /app/alert-definitions:
 *   post:
 *     summary: Create a new alert definition
 *     tags: [Alert Definitions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               service:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [METRIC, PORT, SCRIPT]
 *               description:
 *                  type: string
 *     responses:
 *       201:
 *         description: The created alert definition.
 */
router.post('/', alertDefinitionController.create);

/**
 * @swagger
 * /app/alert-definitions/{id}:
 *   put:
 *     summary: Update an alert definition by ID
 *     tags: [Alert Definitions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The alert definition ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: The updated alert definition.
 *       404:
 *         description: Alert definition not found.
 */
router.put('/:id', alertDefinitionController.update);

/**
 * @swagger
 * /app/alert-definitions/{id}:
 *   delete:
 *     summary: Delete an alert definition by ID
 *     tags: [Alert Definitions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The alert definition ID
 *     responses:
 *       204:
 *         description: Alert definition deleted successfully.
 *       404:
 *         description: Alert definition not found.
 */
router.delete('/:id', alertDefinitionController.deleteById);

export default router;
