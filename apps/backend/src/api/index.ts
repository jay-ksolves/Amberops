
import { Router } from 'express';
import userRoutes from './routes/user.routes';
import clusterRoutes from './routes/cluster.routes';
import serviceRoutes from './routes/service.routes';
import hostRoutes from './routes/host.routes';
import alertRoutes from './routes/alert.routes';
import alertDefinitionRoutes from './routes/alertDefinition.routes';
import taskRoutes from './routes/task.routes';
import activityLogRoutes from './routes/activityLog.routes';
import logEntryRoutes from './routes/logEntry.routes';
import searchRoutes from './routes/search.routes';

// This router handles all PROTECTED routes that require authentication
const protectedRouter = Router();

protectedRouter.use('/users', userRoutes);
protectedRouter.use('/clusters', clusterRoutes);
protectedRouter.use('/services', serviceRoutes);
protectedRouter.use('/hosts', hostRoutes);
protectedRouter.use('/alerts', alertRoutes);
protectedRouter.use('/alert-definitions', alertDefinitionRoutes);
protectedRouter.use('/tasks', taskRoutes);
protectedRouter.use('/activity', activityLogRoutes);
protectedRouter.use('/logs', logEntryRoutes);
protectedRouter.use('/search', searchRoutes);


export default protectedRouter;
