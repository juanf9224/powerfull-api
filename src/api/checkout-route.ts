import * as Joi from 'joi';
import { ServerRoute, Request, ResponseToolkit } from "hapi";

import Checkout from "../models/Checkout";

const CheckoutRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/api/v1/checkout',
        handler: async (req: Request, res: ResponseToolkit) => {            
            try {
                let checkout = await Checkout.find();
                return res.response(checkout);
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/v1/checkout',        
        options: {
            validate: {
                payload: {
                    amount: Joi.number().required(),
                    salesman: Joi.string().required(),
                    client: Joi.string().required()
                }
            }
        },
        handler: async (req: Request, res: ResponseToolkit) => {
            try {         
                const payload: any = req.payload;   
                console.log(payload);
                const { 
                    amount, 
                    salesman,
                    client } = payload;
    
                let product = new Checkout({
                    amount, 
                    salesman,
                    client
                });
                return await product.save();                
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    },
];

export default CheckoutRoutes;