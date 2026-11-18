import { Request, Response, NextFunction } from 'express';
import { analyticsService } from '../services/analytics.service';
import { ApiResponse } from '../types';

export class AnalyticsController {
  getAnalytics = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const clientId = req.query.clientId ? String(req.query.clientId) : 'client-1';
      const data = analyticsService.getAnalyticsForClient(clientId);
      res.json({
        success: true,
        data,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  getAllAnalytics = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const all = analyticsService.getAllAnalytics();
      res.json({
        success: true,
        data: all,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  getPlatformBreakdown = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const clientId = req.params.clientId || 'client-1';
      const breakdown = analyticsService.getPlatformBreakdown(clientId);
      res.json({
        success: true,
        data: breakdown,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  getStrategicInsights = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const clientId = req.params.clientId || 'client-1';
      const insights = analyticsService.getStrategicInsights(clientId);
      res.json({
        success: true,
        data: insights,
        count: insights.length,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  getExecutiveSummary = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const clientId = req.params.clientId || 'client-1';
      const summary = analyticsService.getExecutiveSummary(clientId);
      if (!summary) {
        res.status(404).json({
          success: false,
          error: `Analytics summary not found for client ${clientId}`,
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }
      res.json({
        success: true,
        data: summary,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };
}

export const analyticsController = new AnalyticsController();
