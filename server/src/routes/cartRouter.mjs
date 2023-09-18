import { Router } from 'express';
const router = Router();
//verify
import authVerify from '../middleware/auth.mjs';
//----------------------------------------------------------------


import CartsController from '../app/controllers/CartsController.mjs';

router.get('/', authVerify, CartsController.getUserCart);
router.put('/update-cart', authVerify, CartsController.updateCart);
router.delete('/update-cart/delete-product/:_id', authVerify, CartsController.deleteProductFromCart);

export default router;
