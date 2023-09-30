import dotenv from 'dotenv';
import Roles from '../models/Roles.mjs';

dotenv.config();

class RoleController {
  async getAllRole(req, res) {
    try {
      const roles = await Roles.find({});
      return res.status(200).json({
        success: true,
        message: 'Retrieve roles data successful!',
        roles,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getRoleById(req, res) {
    try {
      const role = await Roles.findById(req.params._id);
      if (!role) {
        return res
          .status(404)
          .json({ success: false, message: 'Role not found!' });
      } else {
        return res
          .status(200)
          .json({ success: true, message: 'Role found!', role });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async addRole(req, res) {
    try {
      const roleName = req.body.roleName;
      if (!roleName) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid role name!' });
      } else {
        const newRole = new Roles({ name: roleName });
        await newRole.save();
        return res
          .status(200)
          .json({ success: true, message: 'Add role successful', role });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async updateRole(req, res) {
    try {
      const roleName = req.body.roleName;
      if (!roleName) {
        return res
          .status(400)
          .json({ success: false, message: 'Invalid role name!' });
      } else {
        const role = await Roles.findByIdAndUpdate(req.params._id, {
          name: roleName,
        });
        if (!role) {
          return res
            .status(404)
            .json({ success: false, message: 'Update role failed!' });
        } else {
          return res
            .status(200)
            .json({ success: true, message: 'Update role successful!', role });
        }
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async deleteRole(req, res) {
    try {
      const role = await Roles.findByIdAndDelete(req.params._id);
      if (!role) {
        return res
          .status(400)
          .json({ success: false, message: 'Delete role failed!' });
      } else {
        return res
          .status(200)
          .json({ success: true, message: 'Delete role successful!', role });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }
}

export default new RoleController();
