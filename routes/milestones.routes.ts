import { Router } from 'express';
import { milestonesController } from '../controllers/milestones.controller';
import { requireFields } from '../middleware/validator';

const router = Router();

// GET /api/milestones - Get milestones (optional query clientId)
router.get('/', milestonesController.getMilestones);

// GET /api/milestones/:id - Get milestone by ID
router.get('/:id', milestonesController.getMilestoneById);

// GET /api/milestones/client/:clientId/summary - Progress summary
router.get('/client/:clientId/summary', milestonesController.getSummary);

// POST /api/milestones - Create new milestone
router.post('/', requireFields(['clientId', 'title']), milestonesController.createMilestone);

// PUT /api/milestones/:id - Update milestone
router.put('/:id', milestonesController.updateMilestone);

// POST /api/milestones/:milestoneId/tasks/:taskId/toggle - Toggle milestone task
router.post('/:milestoneId/tasks/:taskId/toggle', milestonesController.toggleTask);

export default router;
