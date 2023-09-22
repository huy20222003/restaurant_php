import { Schema, model } from 'mongoose';

const Orders = new Schema(
  {
    items: {
      type: Array,
    },
    fullName: {
      type: String,
      default: '',
      required: true,
    },
    shipAddress: {
      type: String,
      default: '',
      required: true,
    },
    phoneNumber: {
      type: String,
      default: '',
      required: true,
    },
    totalPrices: {
      type: Number,
      default: 0.0,
    },
    status: {
      type: Array,
      default: ['ordered'],
    },
    shippingFee: {
      type: Number,
      default: 0.0,
    },
    shippingUnit: {
      type: String,
      default: '',
      required: true,
    },
    paymentMethod: {
      type: String,
      default: '',
      required: true,
    },
    userOrder: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
  },
  {
    timestamps: true,
  }
);

export default model('orders', Orders);
