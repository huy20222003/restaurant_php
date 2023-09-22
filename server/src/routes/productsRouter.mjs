import express from 'express';
import ProductsController from '../app/controllers/ProductsController.mjs';
//verify
import authVerify from '../middleware/auth.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//----------------------------------------------------------------

const router = express.Router();

router.get('/', ProductsController.getAllProducts);
router.get('/:_id', ProductsController.getSingleProduct);
router.get('/search-product', ProductsController.deleteProduct);
router.get('/filter-product', ProductsController.filterProduct);

router.post('/create-product', authVerify, cashbinMiddleware,  ProductsController.addProduct);
router.put('/update-product/:_id', authVerify, cashbinMiddleware, ProductsController.updateProduct);
router.delete('/delete-product/:_id', authVerify, cashbinMiddleware, ProductsController.deleteProduct);

export default router;
