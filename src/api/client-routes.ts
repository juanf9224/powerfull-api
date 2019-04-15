import { ResponseToolkit } from 'hapi';
import { Request } from 'hapi';
import * as Joi from 'joi';

import Client from "../models/Client";

const ClientRoutes = [    
    {
        method: 'GET',
        path: '/api/v1/client',
        handler: async (req: Request, res: ResponseToolkit) => {
            let client = await Client.find();
            return res.response(client);
        }
    },    
    {
        method: 'POST',
        path: '/api/v1/client',
        options: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    contact: Joi.object().optional()
                }
            }
        },
        handler: async (req: any, res: any) => {
            try {
                const {
                    name,
                    contact
                } = req.payload;
    
                const client = new Client({
                    name,
                    contact
                });

                return await client.save();
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    },    
    {
        method: 'PUT',
        path: '/api/v1/client',
        options: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    contact: Joi.object().optional()
                }
            }
        },
        handler: async (req: Request, res: ResponseToolkit) => {
            try {
                let client: any = await Client.findByIdAndUpdate();
                return res.response(client);
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    }
]

export default ClientRoutes;