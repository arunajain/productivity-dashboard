import express from 'express';
const router = express.Router();
import { registerUser, verifyEmailCode, login, changePassword, resetPassword} from '../controllers/auth.js';
import { verifyToken } from '../middleware/auth.js';
router.post('/register', registerUser);
router.post('/verify_email', verifyEmailCode);
router.post('/login', login);

router.post('/password_change',verifyToken, changePassword);
router.post('/password_reset', resetPassword);


export default router;