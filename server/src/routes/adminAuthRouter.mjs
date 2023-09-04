import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';
import authorizeRoles from '../middleware/authorizeRoles.mjs';


import AdminAuthController from '../app/controllers/AdminAuthController.mjs';

router.post('/login', AdminAuthController.loginAdmin);
router.get('/account', authVerify, authorizeRoles(['admin', 'employee']), AdminAuthController.getUserProfile);
router.post('/refresh', authVerify, authorizeRoles(['admin', 'employee']), AdminAuthController.refreshToken);


export default router;
