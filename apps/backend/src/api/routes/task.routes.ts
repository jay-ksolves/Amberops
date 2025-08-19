
import { Router } from 'express';
import * as taskController from '../../controllers/task.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Background tasks and operations management
 */

/**
 * @swagger
 * /app/tasks:
 *   get:
 *     summary: Retrieve a list of all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of tasks.
 */
router.get('/', taskController.getAll);

/**
 * @swagger
 * /app/tasks:
 *   post:
 *     summary: Create a new task (e.g., start/stop service)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: The created task.
 */
router.post('/', taskController.create);

export default router;
