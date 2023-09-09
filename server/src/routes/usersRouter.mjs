import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';
import authorizeRoles from '../middleware/authorizeRoles.mjs';


import UsersController from '../app/controllers/UsersController.mjs';

router.get('/', authVerify, authorizeRoles(['admin', 'employee']), UsersController.getAllUser);
router.get('/:_id',authVerify, authorizeRoles(['admin', 'employee']), UsersController.getSingleUser);
router.post('/create-user', authVerify, authorizeRoles(['admin', 'employee']), UsersController.createUser);
router.delete('/delete-user/:_id', authVerify, authorizeRoles(['admin', 'employee']), UsersController.deleteUserById);

export default router;
