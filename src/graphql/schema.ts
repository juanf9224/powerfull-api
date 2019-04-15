import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql';

import PaintingType from './PaintingType';
import ProductType from './ProductType';
import ClientType from './ClientType';
import ContactType from './ContactType';
import EmployeeType from './EmployeeType';

import Painting from '../models/Painting';
import Product from '../models/Product';
import Client from '../models/Client';
import Employee from '../models/Employee';
import Contact from '../models/Contact';

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
		fields: {
				painting: {
						type: PaintingType,
						args: { id: { type: GraphQLString } },
						resolve(parent: any, args: any){
								return Painting.findById(args.id)
						}
				},
				product: {
					type: ProductType,
					args: { id: { type: GraphQLString } },
					resolve(parent: any, args: any){
							return Product.findById(args.id)
					}
				},
				client: {
					type: ClientType,
					args: { id: { type: GraphQLString } },
					resolve(parent: any, args: any){
							return Client.findById(args.id)
					}
				},
				employee: {
					type: EmployeeType,
					args: { id: { type: GraphQLString } },
					resolve(parent: any, args: any){
							return Employee.findById(args.id)
					}
				}
				// ,
				// contact: {
				// 	type: ContactType,
				// 	args: { id: { type: GraphQLString } },
				// 	resolve(parent: any, args: any){
				// 			return Contact.findById(args.id)
				// 	}
				// }
		}
});

export default new GraphQLSchema({
	query: RootQuery
});;