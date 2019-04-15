import { ServerRoute } from "hapi";

import Painting from "../models/Painting";
import Product from "../models/Product";
import Client from "../models/Client";
import Employee from "../models/Employee";
import ProductRoutes from "./product-routes";
import ClientRoutes from "./client-routes";
import EmployeeRoutes from "./employee-routes";

const ApiRoutes = (): ServerRoute[] => {
    return [
        {
            method: 'GET',
            path: '/api/v1/paintings',
            // config: {
            //     description: 'Get all the paintings',
            //     tags: ['api', 'v1', 'painting']
            // },
            handler: (req: any, res: any) => {
                //logic here
                return Painting.find();
            }
        },
        {
            method: 'POST',
            path: '/api/v1/paintings',
            // config: {
            //     description: 'Save new paintings',
            //     tags: ['api', 'v1', 'painting']
            // },
            handler: (req: any, res: any) => {
                const { name, url, technique } = req.payload;
                let painting = new Painting({
                    name,
                    url,
                    technique
                });
                return painting.save();
            }
        },
        ...ProductRoutes,
        ...ClientRoutes,
        ...EmployeeRoutes
    ]
};

export default ApiRoutes;