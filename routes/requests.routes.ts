import { Router } from 'express';
import { requestsController } from '../controllers/requests.controller';
import { requireFields } from '../middleware/validator';

const router = Router();

// GET /api/requests - List requests (optional ?status=)
router.get('/', requestsController.getRequests);

// GET /api/requests/summary - Pipeline summary
router.get('/summary', requestsController.getPipelineSummary);

// GET /api/requests/:id - Get request by ID
router.get('/:id', requestsController.getRequestById);

// POST /api/requests - Submit service inquiry
router.post(
  '/',
  requireFields(['clientName', 'companyName', 'email']),
  requestsController.createRequest
);

// PATCH /api/requests/:id/status - Update inquiry status
router.patch(
  '/:id/status',
  requireFields(['status']),
  requestsController.updateStatus
);

export default router;
