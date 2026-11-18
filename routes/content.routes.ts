import { Router } from 'express';
import { contentController } from '../controllers/content.controller';
import { requireFields } from '../middleware/validator';

const router = Router();

// GET /api/content - List posts with query filters (clientId, status, platform)
router.get('/', contentController.getPosts);

// GET /api/content/stats/approvals - Pending approval count
router.get('/stats/approvals', contentController.getApprovalStats);

// GET /api/content/:id - Get single post
router.get('/:id', contentController.getPostById);

// POST /api/content/draft - Create new post draft
router.post('/draft', requireFields(['clientId', 'clientName', 'platform', 'title', 'caption']), contentController.createDraft);

// POST /api/content/:id/approve - Approve post
router.post('/:id/approve', contentController.approvePost);

// POST /api/content/:id/request-changes - Request changes on post
router.post('/:id/request-changes', requireFields(['feedbackNote']), contentController.requestChanges);

// POST /api/content/:id/comments - Add comment to post discussion
router.post('/:id/comments', requireFields(['text']), contentController.addComment);

// DELETE /api/content/:id - Delete post
router.delete('/:id', contentController.deletePost);

export default router;
