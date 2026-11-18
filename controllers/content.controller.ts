import { Request, Response, NextFunction } from 'express';
import { contentService } from '../services/content.service';
import { ApiResponse, PostStatus, SocialPlatform } from '../types';

export class ContentController {
  getPosts = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const { clientId, status, platform } = req.query;
      const posts = contentService.getPosts({
        clientId: clientId ? String(clientId) : undefined,
        status: status ? (String(status) as PostStatus) : undefined,
        platform: platform ? (String(platform) as SocialPlatform) : undefined,
      });

      res.json({
        success: true,
        data: posts,
        count: posts.length,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  getPostById = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const post = contentService.getPostById(req.params.id);
      if (!post) {
        res.status(404).json({
          success: false,
          error: `Content post not found with ID ${req.params.id}`,
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }
      res.json({
        success: true,
        data: post,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  createDraft = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const { clientId, clientName, platform, title, caption, hashtags, mediaType, mediaUrls, scheduledDate, author } = req.body;
      const newPost = contentService.createDraft({
        clientId,
        clientName,
        platform,
        title,
        caption,
        hashtags: hashtags || [],
        mediaType: mediaType || 'image',
        mediaUrls: mediaUrls || [],
        scheduledDate: scheduledDate || new Date().toISOString(),
        author: author || 'Cortouch Creative Lead',
      });

      res.status(201).json({
        success: true,
        data: newPost,
        message: 'Content draft created successfully and queued for approval',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  approvePost = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const { id } = req.params;
      const { feedbackNote, authorName, authorRole } = req.body;
      const updated = contentService.approvePost(id, feedbackNote, authorName, authorRole);
      if (!updated) {
        res.status(404).json({
          success: false,
          error: `Post not found with ID ${id}`,
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }

      res.json({
        success: true,
        data: updated,
        message: 'Content draft approved successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  requestChanges = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const { id } = req.params;
      const { feedbackNote, authorName, authorRole } = req.body;
      if (!feedbackNote) {
        res.status(400).json({
          success: false,
          error: 'Feedback note is required when requesting changes',
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }

      const updated = contentService.requestChanges(id, feedbackNote, authorName, authorRole);
      if (!updated) {
        res.status(404).json({
          success: false,
          error: `Post not found with ID ${id}`,
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }

      res.json({
        success: true,
        data: updated,
        message: 'Changes requested and revision note dispatched to creative team',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  addComment = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const { id } = req.params;
      const { text, author, authorRole = 'client' } = req.body;
      if (!text) {
        res.status(400).json({
          success: false,
          error: 'Comment text is required',
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }

      const comment = contentService.addComment(id, text, author || 'Client User', authorRole);
      if (!comment) {
        res.status(404).json({
          success: false,
          error: `Post not found with ID ${id}`,
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }

      res.status(201).json({
        success: true,
        data: comment,
        message: 'Comment posted to thread',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  deletePost = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const { id } = req.params;
      const success = contentService.deletePost(id);
      if (!success) {
        res.status(404).json({
          success: false,
          error: `Post not found with ID ${id}`,
          timestamp: new Date().toISOString(),
        } as any);
        return;
      }
      res.json({
        success: true,
        message: 'Post deleted successfully',
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };

  getApprovalStats = (req: Request, res: Response<ApiResponse>, next: NextFunction): void => {
    try {
      const clientId = req.query.clientId ? String(req.query.clientId) : undefined;
      const pendingCount = contentService.getPendingApprovalsCount(clientId);
      res.json({
        success: true,
        data: {
          pendingCount,
          clientId: clientId || 'all',
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  };
}

export const contentController = new ContentController();
