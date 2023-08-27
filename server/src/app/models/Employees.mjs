import dotenv from 'dotenv';
dotenv.config();
import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
import cloudinary from '../../config/cloudinary/index.mjs';
import jwt from 'jsonwebtoken';

const Employees = new Schema(
  {
    fullName: {
      type: String,
      maxLength: 250,
      required: true,
    },
    username: {
      type: String,
      maxLength: 100,
      requires: true,
      trim: true,
    },
    email: {
      type: String,
      default: '',
      required: true,
      trim: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      default: '',
      trim: true,
    },
    address: {
      type: String,
      default: '',
    },
    position: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
      default: 0,
    },
    password: {
      type: String,
      default: '',
      required: true,
      trim: true,
      minLength: 7,
    },
    avatar: {
      type: String,
      default:
        'https://antimatter.vn/wp-content/uploads/2022/11/anh-avatar-trang-fb-mac-dinh.jpg',
    },
    roles: {
      type: Schema.Types.ObjectId,
      ref: 'roles',
    },
  },
  {
    timestamps: true,
  }
);

Employees.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcryptjs.hash(user.password, 10);
  }
  next();
});

Employees.methods.uploadFileToCloudinary = async function (file) {
  const user = this;
  try {
    if (!file) {
      return {
        status: false,
        message: 'Missing information',
      };
    } else {
      const result = await cloudinary.uploader.upload(file, {
        upload_preset: process.env.UPLOAD_PRESET,
      });
      user.avatar = result.secure_url;
      await user.save();
      return {
        status: true,
        message: 'Upload successful',
        imageUrl: result.secure_url,
      };
    }
  } catch (error) {
    return {
      status: false,
      message: 'Error uploading image',
    };
  }
};

Employees.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '15m',
  });
};

Employees.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '365d',
  });
};

Employees.methods.addRole = async function (role) {
  try {
    this.roles = role._id;
    await this.save();

    role.userId = this._id;
    await role.save();

    return {
      status: true,
      message: 'Role added successfully',
    };
  } catch (error) {
    return {
      status: false,
      message: 'Error adding role',
    };
  }
};

export default model('employees', Employees);
