
import { Router } from 'express';
import * as clusterController from '../../controllers/cluster.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Clusters
 *   description: Cluster management
 */

/**
 * @swagger
 * /app/clusters:
 *   get:
 *     summary: Retrieve a list of all clusters
 *     tags: [Clusters]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of clusters.
 */
router.get('/', clusterController.getAll);

/**
 * @swagger
 * /app/clusters/{id}:
 *   get:
 *     summary: Get a cluster by ID
 *     tags: [Clusters]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The cluster ID
 *     responses:
 *       200:
 *         description: A single cluster object.
 *       404:
 *         description: Cluster not found.
 */
router.get('/:id', clusterController.getById);

/**
 * @swagger
 * /app/clusters:
 *   post:
 *     summary: Create a new cluster
 *     tags: [Clusters]
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
 *         description: The created cluster.
 */
router.post('/', clusterController.create);

export default router;
