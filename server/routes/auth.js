import express from 'express';
const router = express.Router();
import { registerUser, verifyEmailCode, login, changePassword, resetPassword, forgotPassword, authMe} from '../controllers/auth.js';
import { verifyToken } from '../middleware/auth.js';
router.post('/register', registerUser);
router.post('/verify_email', verifyEmailCode);
router.post('/login', login);
router.get('/me', verifyToken, authMe); 
router.post('/password_change',verifyToken, changePassword);
router.post('/forgot_password', forgotPassword)
router.post('/password_reset', resetPassword);


export default router;