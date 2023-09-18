import {Schema, model} from 'mongoose';

const DiscountCode = new Schema ({
    code: {
        type: String,
    }
}, {
    timestamps: true
});

export default model('DiscountCode', DiscountCode);
