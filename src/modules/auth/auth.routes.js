import express from 'express';
import * as authController from './auth.controller.js';
import { validateSignup, validateLogin } from './auth.validation.js';
import { authenticate } from '../../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);

export default router;
