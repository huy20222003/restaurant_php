import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';
import authorizeRoles from '../middleware/authorizeRoles.mjs';


import UsersController from '../app/controllers/UsersController.mjs';

router.get('/', UsersController.getAllUser);
router.get('/:_id', UsersController.getSingleUser);
router.post('/create-user', UsersController.createUser);
router.delete('/delete-user/:_id', UsersController.deleteUserById);

export default router;
