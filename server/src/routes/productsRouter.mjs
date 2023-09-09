import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';
import authorizeRoles from '../middleware/authorizeRoles.mjs';


import ProductsController from '../app/controllers/ProductsController.mjs';

router.get('/', ProductsController.getAllProducts);
router.get('/:_id', ProductsController.getSingleProduct);
router.post('/create-product', authVerify, authorizeRoles(['admin', 'employee']), ProductsController.addProduct);
router.put('/update-product/:_id', authVerify, authorizeRoles(['admin', 'employee']), ProductsController.updateProduct);
router.delete('/delete-product/:_id', authVerify, authorizeRoles(['admin', 'employee']), ProductsController.deleteProduct);
router.get('/search-product', ProductsController.searchProduct);


export default router;
