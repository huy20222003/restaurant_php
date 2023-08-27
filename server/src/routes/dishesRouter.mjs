import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';
import authorizeRoles from '../middleware/authorizeRoles.mjs';


import DishesController from '../app/controllers/DishesController.mjs';

router.get('/', authVerify, authorizeRoles(['admin', 'employee', 'user']), DishesController.getAllDishes);
router.post('/create-dish', authVerify, authorizeRoles(['admin', 'employee']), DishesController.addDish);
router.put('/update-dish/:_id', authVerify, authorizeRoles(['admin', 'employee']), DishesController.updateDish);
router.delete('/delete-dish/:_id', authVerify, authorizeRoles(['admin', 'employee']), DishesController.deleteDish);


export default router;
