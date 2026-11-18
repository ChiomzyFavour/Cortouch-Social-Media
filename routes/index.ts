import { Router } from 'express';
import clientsRoutes from './clients.routes';
import contentRoutes from './content.routes';
import analyticsRoutes from './analytics.routes';
import milestonesRoutes from './milestones.routes';
import requestsRoutes from './requests.routes';
import aiRoutes from './ai.routes';
import { healthCheck } from '../controllers/health.controller';

const apiRouter = Router();

// Health check endpoint
apiRouter.get('/health', healthCheck);

// Mount modular sub-routes
apiRouter.use('/clients', clientsRoutes);
apiRouter.use('/content', contentRoutes);
apiRouter.use('/analytics', analyticsRoutes);
apiRouter.use('/milestones', milestonesRoutes);
apiRouter.use('/requests', requestsRoutes);
apiRouter.use('/ai', aiRoutes);

export default apiRouter;
