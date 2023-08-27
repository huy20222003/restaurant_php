import { Schema, model } from 'mongoose';

const Categorys = new Schema(
  {
    name: {
      type: String,
      maxLength: 250,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('categorys', Categorys);
