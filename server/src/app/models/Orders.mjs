import { Schema, model } from 'mongoose';

const Orders = new Schema(
  {
    items: {
      type: Array,
    },
    totalPrices: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      default: 'pending',
    },
    userOrder: {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    timestamps: true,
  }
);

export default model('orders', Orders);
