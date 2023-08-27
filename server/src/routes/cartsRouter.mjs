import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';
import authorizeRoles from '../middleware/authorizeRoles.mjs';

import CartsController from '../app/controllers/CartsController.mjs';

router.get('/', authVerify, authorizeRoles(['user']), CartsController.getUserCart);
router.put('/update-cart', authVerify, authorizeRoles(['user']), CartsController.updateCart);


export default router;
