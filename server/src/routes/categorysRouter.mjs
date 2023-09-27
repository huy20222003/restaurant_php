import { Router } from 'express';
const router = Router();
//verify
import authVerify from '../middleware/auth.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//controller
import CategorysController from '../app/controllers/CategorysController.mjs';
//----------------------------------------------------------------------------

router.get('/', CategorysController.getAllCategories);
router.get('/:_id', CategorysController.getSingleCategory);
router.post(
  '/create-category',
  authVerify,
  cashbinMiddleware,
  CategorysController.addCategory
);
router.put(
  '/update-category/:_id',
  authVerify,
  cashbinMiddleware,
  CategorysController.updateCategory
);
router.delete(
  '/delete-category/:_id',
  authVerify,
  cashbinMiddleware,
  CategorysController.deleteCategory
);
router.patch(
  '/add-product',
  authVerify,
  cashbinMiddleware,
  CategorysController.addProductToCategory
);

export default router;
