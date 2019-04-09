import { Schema, model } from 'mongoose';

const PaintingSchema: Schema = new Schema({
    name: String,
    url: String,
    technique: String
});

export default model('Painting', PaintingSchema);