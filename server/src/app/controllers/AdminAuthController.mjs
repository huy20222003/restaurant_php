import dotenv from 'dotenv';
import Employees from '../models/Employees.mjs';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import Roles from '../models/Roles.mjs';

dotenv.config();

class AuthController {
  async getProfile(req, res) {
    try {
      const admin = await Employees.findById(req._id).select('-password');
      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: 'User not found!' });
      }
      return res
        .status(200)
        .json({ success: true, message: 'User found!', data: admin });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async loginAdmin(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide username and password.',
      });
    }

    try {
      const admin = await Employees.findOne({ username });

      if (!admin) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password!',
        });
      }

      const passwordMatch = await bcryptjs.compare(password, admin.password);

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message: 'Invalid username or password!',
        });
      }

      const role = await Roles.findById(admin.roles);

      if (!role) {
        return res.status(404).json({ message: 'Role not found' });
      }

      const accessToken = admin.generateAccessToken();
      const refreshToken = admin.generateRefreshToken();

      return res.status(201).json({
        success: true,
        message: 'Logged in successfully!',
        accessToken,
        refreshToken,
        role: role.name,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'An error occurred while processing the request.',
        error: error.message,
      });
    }
  }

  async refreshToken(req, res) {
    try {
      const refreshToken = req.body.refreshToken;
      if (!refreshToken) {
        return res.status(401).json({
          success: false,
          message: 'RefreshToken not found.',
        });
      }

      try {
        const decoded = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        if (!decoded) {
          return res.status(403).json({
            success: false,
            message: 'RefreshToken is invalid.',
          });
        } else {
          const admin = await Employees.findById(decoded._id);
          const accessToken = admin.generateAccessToken();

          return res.status(200).json({
            success: true,
            message: 'New AccessToken generated!',
            data: accessToken,
          });
        }
      } catch (verifyError) {
        return res.status(403).json({
          success: false,
          message: 'RefreshToken is invalid.',
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
}

export default new AuthController();
