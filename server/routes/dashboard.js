import express from 'express';
const router = express.Router();
import { verifyToken } from '../middleware/auth.js';
import { dashboard } from '../controllers/dashboard.js';

router.get('/dahsboard', verifyToken, dashboard);