import { Router } from 'express';
import { analyticsController } from '../controllers/analytics.controller';

const router = Router();

// GET /api/analytics - Get analytics (query clientId)
router.get('/', analyticsController.getAnalytics);

// GET /api/analytics/all - Get all clients analytics records
router.get('/all', analyticsController.getAllAnalytics);

// GET /api/analytics/:clientId/platforms - Platform breakdown
router.get('/:clientId/platforms', analyticsController.getPlatformBreakdown);

// GET /api/analytics/:clientId/insights - Strategic insights
router.get('/:clientId/insights', analyticsController.getStrategicInsights);

// GET /api/analytics/:clientId/summary - Executive summary
router.get('/:clientId/summary', analyticsController.getExecutiveSummary);

export default router;
