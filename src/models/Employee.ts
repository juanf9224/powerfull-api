import { Schema, model } from 'mongoose';

const EmployeeSchema: Schema = new Schema({
    name: String,
    position: String,
});

export default model('Employee', EmployeeSchema);