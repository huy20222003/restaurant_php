import { Schema, model } from 'mongoose';

const Roles = new Schema(
  {
    name: {
      type: String,
      maxLength: 250,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model('roles', Roles);
