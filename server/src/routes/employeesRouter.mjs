import { Router } from 'express';
const router = Router();
import authVerify from '../middleware/auth.mjs';
import authorizeRoles from '../middleware/authorizeRoles.mjs';

import Employees from '../app/controllers/EmployeesController.mjs';

router.get('/', authVerify, authorizeRoles(['admin']), Employees.getAllEmployees);
router.post('/create-emloyee', authVerify, authorizeRoles(['admin']), Employees.addEmployee);
router.put('/update-employee/:_id', authVerify, authorizeRoles(['admin']), Employees.updateEmployee);
router.delete('/delete-employee/:_id', authVerify, authorizeRoles(['admin']), Employees.deleteEmployee);


export default router;
