import { Schema, model } from 'mongoose';
import Contact from './Contact';

const ClientSchema: Schema = new Schema({
    name: String,
    contact: {        
        phoneNumber: String,
        email: String,
        address: String
    }
});

export default model('Client', ClientSchema);