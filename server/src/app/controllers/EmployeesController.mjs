import Employees from '../models/Employees.mjs';
import Roles from '../models/Roles.mjs';

class EmployeeController {
  async getAllEmployees(req, res) {
    try {
      const employees = await Employees.find({});
      return res.status(200).json({
        success: true,
        message: 'Retrieve employee data successfully!',
        employees,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getSingleEmployee(req, res) {
    try {
      const employee = await Employees.findById(req.params._id);
      return res.status(200).json({
        success: true,
        message: 'Retrieve employee data successfully!',
        employee,
      });
    } catch (error) {
      return res.status(500).json({
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
        console.log(fullName, username, email, position, salary, password)
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

      return res.status(201).json({
        success: true,
        message: 'Employee added successfully!',
        employee: newEmployee,
      });
    } catch (error) {
      return res.status(500).json({
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
      } else {
        return res.json({
          success: true,
          message: 'Employee updated successfully!',
          employee: updatedEmployee,
        });
      }
    } catch (error) {
      return res.status(500).json({
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
      return res.json({
        success: true,
        message: 'Employee deleted successfully!',
        data: deletedEmployee,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }
}

export default new EmployeeController();
