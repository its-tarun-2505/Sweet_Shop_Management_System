import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
    handleRegister,
    handleLogin,
    handleGetCurrentUser
} from '../controller/user.js';

const router = express.Router();

// Public routes
router.post('/register', handleRegister);
router.post('/login', handleLogin);

// Private route (requires valid JWT)
router.get('/me', protect, handleGetCurrentUser);

export default router;
