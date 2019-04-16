import { Schema, model } from 'mongoose';

const ProductSchema: Schema = new Schema({
    name: String,
    quantity: Number,
    price: Number,
    maxPrice: Number,
    minPrice: Number,
    expirationDate: Date,
    warranty: Date
});

export default model('Product', ProductSchema);