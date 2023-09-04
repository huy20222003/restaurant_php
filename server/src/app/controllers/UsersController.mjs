import dotenv from 'dotenv';
import Users from '../models/Users.mjs';
import Roles from '../models/Roles.mjs';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

dotenv.config();

class AuthController {
  async getAllUser(req, res) {
    try {
      const users = await Users.find({}).select('-password');
      return res
        .status(200)
        .json({ success: true, message: 'GET successful!', users });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async getSingleUser(req, res) {
    try {
      const user = await Users.findById(req.params._id).select('-password');
      if (!user) {
        return res.status(404).json({ success: false, message: 'user not found' });
      }
      return res.status(200).json({ success: true, message: 'user found', user });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  async createUser(req, res) {
    const { fullName, username, email, password } = req.body;
    if (!username || !fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required information.',
      });
    }
    try {
      const existingUser = await Users.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res.status(400).json({
          success: false,
          message: 'Username or email already exists!',
        });
      } else {
        const newUser = new Users({ fullName, username, email, password });
        const role = new Roles({ name: 'user' });
        newUser.addRole(role);

        return res.status(200).json({
          success: true,
          message: 'Add user successful!',
          user: newUser,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async deleteUserById(req, res) {
    try {
      const user = await Users.findByIdAndDelete(req.params._id);
      if (!user) {
        return res
          .status(400)
          .json({ success: false, message: 'User not found in system' });
      } else {
        return res
          .status(200)
          .json({ success: true, message: 'Delete user successful!' });
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

export default new AuthController();
