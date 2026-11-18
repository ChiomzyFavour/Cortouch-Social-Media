import { Router } from 'express';
import { clientsController } from '../controllers/clients.controller';

const router = Router();

// GET /api/clients - Get all clients
router.get('/', clientsController.getAllClients);

// GET /api/clients/packages - Get all service packages
router.get('/packages', clientsController.getAllPackages);

// GET /api/clients/:id - Get client details by ID
router.get('/:id', clientsController.getClientById);

export default router;
