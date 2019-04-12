import { GraphQLObjectType, GraphQLString, GraphQLSchema } from 'graphql';

import PaintingType from './PaintingType';
import Painting from '../models/Painting';

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
		fields: {
				painting: {
						type: PaintingType,
						args: { id: { type: GraphQLString } },
						resolve(parent: any, args: any){
								return Painting.findById(args.id)
						}
				}
		}
});

export default new GraphQLSchema({
	query: RootQuery
});;