import {Schema, model} from 'mongoose';

const Carts = new Schema ({
    items: {
        type: Array,
    },
    totalPrices: {
        type: Number,
        default: 0
    },
    userCart: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    timestamps: true
});

export default model('carts', Carts);
