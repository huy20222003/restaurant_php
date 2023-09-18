import { Schema, model } from 'mongoose';

const Payments = new Schema(
  {
    fullName: {
      type: String,
      require: true,
    },
    accountNumber: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      require: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  }
);

export default model('payments', Payments);
