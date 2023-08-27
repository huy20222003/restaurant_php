import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';
import authorizeRoles from '../middleware/authorizeRoles.mjs';


import CategorysController from '../app/controllers/CategorysController.mjs'

router.get('/', authVerify, authorizeRoles(['admin', 'employee', 'user']), CategorysController.getAllCategories);
router.post('/create-category', authVerify, authorizeRoles(['admin', 'employee']), CategorysController.addCategory);
router.put('/update-category/:_id', authVerify, authorizeRoles(['admin', 'employee']), CategorysController.updateCategory);
router.delete('/delete-category/:_id', authVerify, authorizeRoles(['admin', 'employee']), CategorysController.deleteCategory);


export default router;
