import { Schema, model } from 'mongoose';

const Orders = new Schema(
  {
    items: {
      type: Array,
    },
    shipAddress: {
      type: String,
      default: '',
      required: true,
    },
    phoneNumber: {
      type: String,
      default: '',
      required: true
    },
    totalPrices: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Ordered', 'Delivering', 'Delivered', 'Canceled', 'Returns'],
      default: 'Ordered',
    },
    shippingFee: {
      type: Number,
      default: 0
    },
    paymentMethods: {
      type: String,
      default: '',
      required: true,
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
