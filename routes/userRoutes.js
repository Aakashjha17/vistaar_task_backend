import express from 'express'
const router = express.Router();
import { googleAuthHandler,googleAuthCallbackHandler} from '../controllers/userController.js';

// Route for Google OAuth login
router.get('/google', googleAuthHandler);

// Route for Google OAuth callback
router.get('/google/callback', googleAuthCallbackHandler);

export default router;