import { Request, Response, NextFunction } from 'express';
import { requestsService } from '../services/requests.service';
import { ApiResponse, RequestStatus } from '../types';

export class RequestsController {
  getRequests = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const status = req.query.status ? (String(req.query.status) as RequestStatus) : undefined;
      const requests = requestsService.getRequests(status);
      res.json({
        success: true,
        data: requests,
        count: requests.length,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  getRequestById = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const request = requestsService.getRequestById(req.params.id);
      if (!request) {
        res.status(404).json({
          success: false,
          error: `Service inquiry not found with ID ${req.params.id}`,
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }
      res.json({
        success: true,
        data: request,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  createRequest = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const {
        clientName,
        companyName,
        email,
        phone,
        website,
        platforms,
        services,
        monthlyBudget,
        goals,
        targetAudience,
        preferredStartDate,
        notes,
        estimatedQuoteMonthly,
      } = req.body;

      const created = requestsService.createRequest({
        clientName,
        companyName,
        email,
        phone,
        website,
        platforms: platforms || ['instagram'],
        services: services || ['omnichannel-scale'],
        monthlyBudget: monthlyBudget || '$3,000 - $6,000 / mo',
        goals: goals || ['Brand Awareness & Growth'],
        targetAudience: targetAudience || 'Modern Consumers',
        preferredStartDate: preferredStartDate || new Date().toISOString().split('T')[0],
        notes,
        estimatedQuoteMonthly: estimatedQuoteMonthly || 0,
      });

      res.status(201).json({
        success: true,
        data: created,
        message: 'Service inquiry submitted successfully. Cortouch Media team will review within 24 hours.',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  updateStatus = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!status) {
        res.status(400).json({
          success: false,
          error: 'Status is required',
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }

      const updated = requestsService.updateStatus(id, status as RequestStatus);
      if (!updated) {
        res.status(404).json({
          success: false,
          error: `Service inquiry not found with ID ${id}`,
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }

      res.json({
        success: true,
        data: updated,
        message: `Inquiry status changed to ${status}`,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  getPipelineSummary = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const summary = requestsService.getPipelineSummary();
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

export const requestsController = new RequestsController();
