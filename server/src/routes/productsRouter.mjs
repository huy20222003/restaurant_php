import express from 'express';
import ProductsController from '../app/controllers/ProductsController.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//verify
import authVerify from '../middleware/auth.mjs';
//----------------------------------------------------------------

const router = express.Router();

router.get('/', ProductsController.getAllProducts);
router.get('/:_id', ProductsController.getSingleProduct);
router.get('/search-product', ProductsController.deleteProduct);
router.get('/filter-product', ProductsController.filterProduct);

router.use(cashbinMiddleware);

router.post('/create-product', authVerify, ProductsController.addProduct);
router.put('/update-product/:_id', authVerify, ProductsController.updateProduct);
router.delete('/delete-product/:_id', authVerify, ProductsController.deleteProduct);

export default router;
