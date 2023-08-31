import { Schema, model } from 'mongoose';

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
      type: String,
      default: '0',
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default model('dishes', Dishes);
