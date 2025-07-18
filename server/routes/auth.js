const express = require(express);
const router = express.Router();
const { registerUser } = require('../controllers/auth/register');
const { verifyEmailCode } = require('../controllers/auth/verify-email-code');
router.post('/register', registerUser);
router.post('/verify_email', verifyEmailCode);
module.exports = router;