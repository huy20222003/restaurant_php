import {Schema, model} from 'mongoose';

const Dishes = new Schema ({
    name: {
        type: String,
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
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    userCreate: {
        type: Schema.Types.ObjectId,
        ref: 'employess'
    }
}, {
    timestamps: true
});

export default model('dishes', Dishes);
