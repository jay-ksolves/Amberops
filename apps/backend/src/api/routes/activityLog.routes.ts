
import { Router } from 'express';
import * as activityLogController from '../../controllers/activityLog.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Activity Logs
 *   description: User and system activity logs
 */

/**
 * @swagger
 * /app/activity:
 *   get:
 *     summary: Retrieve a list of all activity logs
 *     tags: [Activity Logs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of activity logs.
 */
router.get('/', activityLogController.getAll);

/**
 * @swagger
 * /app/activity/{id}:
 *   get:
 *     summary: Get an activity log by ID
 *     tags: [Activity Logs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The activity log ID
 *     responses:
 *       200:
 *         description: A single activity log object.
 *       404:
 *         description: Activity log not found.
 */
router.get('/:id', activityLogController.getById);

export default router;
