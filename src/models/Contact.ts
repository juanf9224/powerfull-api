import { Schema, model } from 'mongoose';

const ContactSchema: Schema = new Schema({
    phoneNumber: String,
    email: String,
    address: String    
});

export default model('Contact', ContactSchema);