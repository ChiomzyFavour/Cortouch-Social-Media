import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Cortouch Media Backend API',
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    endpoints: {
      clients: '/api/clients',
      packages: '/api/clients/packages',
      posts: '/api/content',
      analytics: '/api/analytics',
      milestones: '/api/milestones',
      requests: '/api/requests',
      aiGenerate: '/api/ai/generate',
    },
  });
};
