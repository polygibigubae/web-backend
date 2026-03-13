import express from 'express';
import * as roleController from './role.controller.js';
import { authenticate } from '../../middleware/auth.middleware.js';
import { requireAdmin } from '../../middleware/role.middleware.js';

const router = express.Router();

// All role management routes require admin or super admin
router.get(
  '/users',
  authenticate,
  requireAdmin,
  roleController.getAllUsers
);

router.get(
  '/users/:id',
  authenticate,
  requireAdmin,
  roleController.getUserById
);

router.patch(
  '/users/:id/role',
  authenticate,
  requireAdmin,
  roleController.updateUserRole
);

router.patch(
  '/users/:id/status',
  authenticate,
  requireAdmin,
  roleController.updateUserStatus
);

export default router;
