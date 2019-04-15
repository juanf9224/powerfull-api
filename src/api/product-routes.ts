import * as Joi from 'joi';
import { ServerRoute, Request, ResponseToolkit } from "hapi";

import Product from "../models/Product";

const ProductRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/api/v1/products',
        handler: async (req: Request, res: ResponseToolkit) => {            
            try {
                let products = await Product.find();
                return res.response(products);
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/v1/products',        
        options: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    price: Joi.number().required(),
                    maxPrice: Joi.number().required(),
                    minPrice: Joi.number().required(),
                    expirationDate: Joi.date().optional(),
                    warranty: Joi.date().optional(),
                }
            }
        },
        handler: async (req: Request, res: ResponseToolkit) => {
            const payload: any = req.payload;
            try {            
                const { 
                    name, 
                    price,
                    maxPrice, 
                    minPrice, 
                    expirationDate, 
                    warranty } = payload;
    
                let product = new Product({
                    name, 
                    price,
                    maxPrice, 
                    minPrice, 
                    expirationDate, 
                    warranty
                });
                return await product.save();                
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    },
];

export default ProductRoutes;