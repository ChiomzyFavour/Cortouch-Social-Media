import express, { Express } from 'express';
import apiRouter from './routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

export function createBackendApp(): Express {
  const app = express();

  // Middleware
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(requestLogger);

  // Mount API endpoints
  app.use('/api', apiRouter);

  // API 404 fallback for missing /api routes
  app.use('/api/*', notFoundHandler);

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
}

export const backendApp = createBackendApp();
