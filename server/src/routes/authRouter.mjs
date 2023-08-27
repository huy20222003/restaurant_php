import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';
import authorizeRoles from '../middleware/authorizeRoles.mjs';


import AuthController from '../app/controllers/AuthController.mjs';

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.get('/account', authVerify, authorizeRoles(['admin', 'employee', 'user']), AuthController.getUserProfile);
router.post('/refresh', authorizeRoles(['admin', 'employee', 'user']), AuthController.refreshToken);


export default router;
