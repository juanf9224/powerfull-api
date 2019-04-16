import { Schema, model } from 'mongoose';

const CheckoutSchema: Schema = new Schema({
    amount: Number,
    salesman: String,
    client: String
});

export default model('Checkout', CheckoutSchema);