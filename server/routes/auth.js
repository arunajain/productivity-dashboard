import express from 'express';
const router = express.Router();
import {registerUser} from '../controllers/auth/register.js';
import verifyEmailCode from '../controllers/auth/verify-email-code.js';
router.post('/register', registerUser);
router.post('/verify_email', verifyEmailCode);
export default router;