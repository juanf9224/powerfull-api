import Employee from "../models/Employee";
import { Request, ResponseToolkit, ServerRoute } from "hapi";
import * as Joi from 'joi';

const EmployeeRoutes: ServerRoute[] = [
    {
        method: 'GET',
        path: '/api/v1/employee',
        handler: async (req: Request, res: ResponseToolkit) => {
            try {
                let employee = await Employee.find();
                return res.response(employee);                
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    },
    {
        method: 'POST',
        path: '/api/v1/employee',
        options: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    position: Joi.string().required(),
                }
            }
        },
        handler: async (req: Request, res: ResponseToolkit) => {
            try {
                const payload: any = req.payload;
                const {
                    name,
                    position
                } = payload;
    
                const employee = new Employee({
                    name,
                    position
                })
                return await employee.save();                
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    },
    {
        method: 'PUT',
        path: '/api/v1/employee/{id}',
        options: {
            validate: {
                payload: {
                    name: Joi.string().required(),
                    position: Joi.string().required(),
                }
            }
        },
        handler: async (req: Request, res: ResponseToolkit) => {
            try {
                let employee: any = await Employee.findByIdAndUpdate(req.params.id, req.payload);
                return res.response(employee);
            } catch (error) {
                return res.response(error).code(500);
            }
        }
    }
];

export default EmployeeRoutes;