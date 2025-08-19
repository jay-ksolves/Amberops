
import { Router } from 'express';
import * as logEntryController from '../../controllers/logEntry.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Log Entries
 *   description: Log entry searching
 */

/**
 * @swagger
 * /app/logs:
 *   get:
 *     summary: Retrieve a list of all log entries (can be filtered)
 *     tags: [Log Entries]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of log entries.
 */
router.get('/', logEntryController.getAll);

export default router;
