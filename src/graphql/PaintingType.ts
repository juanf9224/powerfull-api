import { GraphQLObjectType, GraphQLString } from 'graphql';

const PaintingType = new GraphQLObjectType({    
    name: 'Painting',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        url: { type: GraphQLString },
        technique: { type: GraphQLString }
    })
});

export default PaintingType;