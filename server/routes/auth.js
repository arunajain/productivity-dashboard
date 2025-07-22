import express from 'express';
const router = express.Router();
import { registerUser, verifyEmailCode, login} from '../controllers/auth.js';

router.post('/register', registerUser);
router.post('/verify_email', verifyEmailCode);
router.post('/login', login);

// router.post('/password_change', login);
// router.post('/password_reset', login);
// router.post('/logout', login);
export default router;