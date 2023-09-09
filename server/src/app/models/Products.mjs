import { Schema, model } from 'mongoose';
import cloudinary from '../../config/cloudinary/index.mjs';

const Products = new Schema(
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
    priceSale: {
      type: Number,
      default: ''
    },
    status: {
      type: String,
      enum: ['sale', 'new'],
      default: 'new'
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true
    },
    image_url: {
      type: Array,
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

Products.statics.uploadFileToCloudinary  = async function (image_url) {
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

export default model('products', Products);
