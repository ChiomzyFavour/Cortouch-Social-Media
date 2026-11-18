import { Request, Response, NextFunction } from 'express';
import { aiService } from '../services/ai.service';
import { ApiResponse } from '../types';

export class AIController {
  generatePost = async (req: Request, res: Response<ApiResponse>, next: NextFunction): Promise<void> => {
    try {
      const { topic, platform, tone, targetAudience, cta } = req.body;
      if (!topic || !platform) {
        res.status(400).json({
          success: false,
          error: 'Both topic and platform are required for AI content generation',
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }

      const generated = await aiService.generateSocialContent({
        topic,
        platform,
        tone,
        targetAudience,
        cta,
      });

      res.json({
        success: true,
        data: generated,
        message: 'AI social content draft generated successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };
}

export const aiController = new AIController();
