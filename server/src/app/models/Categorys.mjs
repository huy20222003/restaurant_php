import { Schema, model } from 'mongoose';

const Categorys = new Schema(
  {
    name: {
      type: String,
      maxLength: 250,
      required: true,
    },
    description: {
      type: String,
      maxLength: 3000,
    }
  },
  {
    timestamps: true,
  }
);

export default model('categorys', Categorys);
