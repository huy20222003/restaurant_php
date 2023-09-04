import { Schema, model } from 'mongoose';
import cloudinary from '../../config/cloudinary/index.mjs';

const Dishes = new Schema(
  {
    name: {
      type: String,
      maxLength: 250,
      required: true,
    },
    description: {
      type: String,
      default: '',
      maxLength: 3000,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: '',
    },
    image_url: {
      type: String,
      required: true,
    },
    rate: {
      type: Number,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

Dishes.statics.uploadFileToCloudinary  = async function (image_url) {
  try {
    if (!image_url) {
      return {
        status: false,
        message: 'Missing information',
      };
    } else {
      const result = await cloudinary.uploader.upload(image_url, {
        upload_preset: process.env.UPLOAD_PRESET,
      });
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

export default model('dishes', Dishes);
