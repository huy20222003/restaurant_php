import { Router } from 'express';
const router = Router();
//verify
import authVerify from '../middleware/auth.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//controller
import AdminAuthController from '../app/controllers/AdminAuthController.mjs';
//-------------------------------------------------------------------------------------

router.post('/login', AdminAuthController.loginAdmin);
router.get('/account', authVerify, cashbinMiddleware, AdminAuthController.getUserProfile);
router.post('/refresh', AdminAuthController.refreshToken);


export default router;
