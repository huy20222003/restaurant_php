import { Router } from 'express';
const router = Router();
//verify
import authVerify from '../middleware/auth.mjs';
import cashbinMiddleware from '../middleware/cashbinMiddleware.mjs';
//controller
import Employees from '../app/controllers/EmployeesController.mjs';
//-------------------------------------------------------------

router.get('/', authVerify, cashbinMiddleware, Employees.getAllEmployees);
router.get('/:_id', authVerify, cashbinMiddleware, Employees.getSingleEmployee);
router.post('/create-emloyee', authVerify, cashbinMiddleware, Employees.addEmployee);
router.put('/update-employee/:_id', authVerify, cashbinMiddleware, Employees.updateEmployee);
router.delete('/delete-employee/:_id', authVerify, cashbinMiddleware, Employees.deleteEmployee);
router.patch('/update-employee/password', authVerify, cashbinMiddleware, Employees.updatePassword);
router.patch('/update-employee/avatar', authVerify, cashbinMiddleware, Employees.updateAvatar);


export default router;
