import { Schema, model } from 'mongoose';
import Contact from './Contact';

const ClientSchema: Schema = new Schema({
    name: String,
    contact: Contact
});

export default model('Client', ClientSchema);