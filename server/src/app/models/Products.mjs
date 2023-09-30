import { Schema, model } from 'mongoose';
import cloudinary from '../../config/cloudinary/index.mjs';

const Products = new Schema(
  {
    name: {
      type: String,
      maxLength: 250,
      required: true,
    },
    subDescription: {
      type: String,
      default: '',
      maxLength: 1000,
    },
    description: {
      type: String,
      default: '',
      maxLength: 3000,
      required: true,
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
      default: 'new',
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      default: '',
    },
    size: {
      type: Array,
      default: ''
    },
    color: {
      type: Array,
      default: ''
    },
    quantity: {
      type: Number,
      default: 0
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

Products.statics.uploadFileToCloudinary = async function (file) {
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
