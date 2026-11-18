import { Request, Response, NextFunction } from 'express';
import { milestonesService } from '../services/milestones.service';
import { ApiResponse } from '../types';

export class MilestonesController {
  getMilestones = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const clientId = req.query.clientId ? String(req.query.clientId) : undefined;
      const milestones = milestonesService.getMilestones(clientId);
      res.json({
        success: true,
        data: milestones,
        count: milestones.length,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  getMilestoneById = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const milestone = milestonesService.getMilestoneById(req.params.id);
      if (!milestone) {
        res.status(404).json({
          success: false,
          error: `Milestone not found with ID ${req.params.id}`,
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }
      res.json({
        success: true,
        data: milestone,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  createMilestone = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const { clientId, phase, title, description, startDate, dueDate, owner, category, tasks } = req.body;
      const milestone = milestonesService.createMilestone({
        clientId,
        phase: phase || 'Phase 1',
        title,
        description: description || '',
        startDate: startDate || new Date().toISOString().split('T')[0],
        dueDate: dueDate || new Date().toISOString().split('T')[0],
        owner: owner || 'Cortouch Project Team',
        category: category || 'strategy',
        status: 'upcoming',
        progress: 0,
        tasks: tasks || [],
      });

      res.status(201).json({
        success: true,
        data: milestone,
        message: 'Milestone created successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  updateMilestone = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const { id } = req.params;
      const updated = milestonesService.updateMilestone(id, req.body);
      if (!updated) {
        res.status(404).json({
          success: false,
          error: `Milestone not found with ID ${id}`,
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }
      res.json({
        success: true,
        data: updated,
        message: 'Milestone updated successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  toggleTask = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const { milestoneId, taskId } = req.params;
      const updated = milestonesService.toggleTask(milestoneId, taskId);
      if (!updated) {
        res.status(404).json({
          success: false,
          error: `Milestone not found with ID ${milestoneId}`,
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }
      res.json({
        success: true,
        data: updated,
        message: 'Task toggled and progress recalculated',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  getSummary = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const clientId = req.params.clientId || 'client-1';
      const summary = milestonesService.getClientMilestoneSummary(clientId);
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

export const milestonesController = new MilestonesController();
