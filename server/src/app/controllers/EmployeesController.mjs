import Employees from '../models/Employees.mjs';
import Roles from '../models/Roles.mjs';

class EmployeeController {
  async getAllEmployees(req, res) {
    try {
      const employees = await Employees.find({});
      res.status(200).json({
        success: true,
        message: 'Retrieve employee data successfully!',
        employees,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async addEmployee(req, res) {
    try {
      const { fullName, username, email, position, salary, password } =
        req.body;
      if (
        !fullName ||
        !username ||
        !email ||
        !position ||
        !salary ||
        !password
      ) {
        return res
          .status(400)
          .json({ success: false, message: 'Required fields missing' });
      }
  
      const roles = await Roles.findOne({ name: position });
  
      if (!roles) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid position' });
      }
  
      const newEmployee = new Employees({
        fullName,
        username,
        email,
        position,
        salary,
        password,
        roles: roles._id,
      });
  
      await newEmployee.save();
  
      res.status(201).json({
        success: true,
        message: 'Employee added successfully!',
        employee: newEmployee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updateEmployee(req, res) {
    try {
      const updatedEmployee = await Employees.findByIdAndUpdate(
        req.params._id,
        req.body,
        { new: true }
      );
      if (!updatedEmployee) {
        return res
          .status(404)
          .json({ success: false, message: 'Employee not found' });
      }
      console.log(updatedEmployee);

      if (
        !updatedEmployee.fullName ||
        !updatedEmployee.email ||
        !updatedEmployee.position ||
        !updatedEmployee.salary ||
        !updatedEmployee.password
      ) {
        return res
          .status(400)
          .json({ success: false, message: 'Required fields missing' });
      }

      res.json({
        success: true,
        message: 'Employee updated successfully!',
        data: updatedEmployee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async deleteEmployee(req, res) {
    try {
      const deletedEmployee = await Employees.findByIdAndDelete(req.params._id);
      if (!deletedEmployee) {
        return res
          .status(404)
          .json({ success: false, message: 'Employee not found' });
      }
      res.json({
        success: true,
        message: 'Employee deleted successfully!',
        data: deletedEmployee,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }
}

export default new EmployeeController();
