import {Schema, model} from 'mongoose';

const Employees = new Schema ({
    name: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    }, 
    salary: {
        type: Number,
        required: true,
        default: 0
    }
});

export default model('employees', Employees);
