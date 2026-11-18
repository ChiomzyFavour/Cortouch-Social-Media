import { Request, Response, NextFunction } from 'express';
import { clientsService } from '../services/clients.service';

type ApiResponse = {
  success: boolean;
  data?: unknown;
  count?: number;
  error?: string;
  timestamp: string;
};

export class ClientsController {
  getAllClients = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const clients = clientsService.getAllClients();
      res.json({
        success: true,
        data: clients,
        count: clients.length,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  getClientById = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const client = clientsService.getClientById(req.params.id);
      if (!client) {
        res.status(404).json({
          success: false,
          error: `Client not found with ID ${req.params.id}`,
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }
      res.json({
        success: true,
        data: client,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  getAllPackages = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const packages = clientsService.getAllPackages();
      res.json({
        success: true,
        data: packages,
        count: packages.length,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };
}

export const clientsController = new ClientsController();
