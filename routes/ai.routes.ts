import { Router } from 'express';
import { aiController } from '../controllers/ai.controller';
import { requireFields } from '../middleware/validator';

const router = Router();

// POST /api/ai/generate - Generate social caption, hashtags, and retention hook
router.post('/generate', requireFields(['topic', 'platform']), aiController.generatePost);

export default router;
