import * as Joi from 'joi';
import { ServerRoute, Request, ResponseToolkit } from "hapi";

import Product from "../models/Product";

const ProductRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/api/v1/products/{id}',
        handler: async (req: Request, res: ResponseToolkit) => {            
            try {
                let product: any = await Product.findById(req.params.id);
                return res.response(product);
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/v1/products/findAllById',     
        handler: async (req: Request, res: ResponseToolkit) => {            
            try {
                console.log(req.payload);
                let product: any = await Product.find({_id: {$in : req.payload}});
                return res.response(product);
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    },
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
                    quantity: Joi.number().required(),
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
                    quantity,
                    price,
                    maxPrice, 
                    minPrice, 
                    expirationDate, 
                    warranty } = payload;
    
                let product = new Product({
                    name, 
                    quantity,
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
    {
        method: 'PUT',
        path: '/api/v1/products/{id}',        
        // options: {
        //     validate: {
        //         payload: {
        //             name: Joi.string().optional(),
        //             quantity: Joi.number().optional(),
        //             price: Joi.number().optional(),
        //             maxPrice: Joi.number().optional(),
        //             minPrice: Joi.number().optional(),
        //             expirationDate: Joi.date().optional(),
        //             warranty: Joi.date().optional(),
        //         }
        //     }
        // },
        handler: async (req: Request, res: ResponseToolkit) => {
            try{
                if(req.params && req.params.id){
                    let product: any = await Product.findOneAndUpdate(req.params.id, req.payload);
                    return res.response(product);
                }else{
                    return res.response('invalid parameters').code(500);
                }             
                
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    }
];

export default ProductRoutes;