import { GraphQLObjectType, GraphQLString, GraphQLFloat } from 'graphql';

const ProductType = new GraphQLObjectType({    
    name: 'Product',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        quantity: { type: GraphQLString },
        price: { type: GraphQLFloat },
        maxPrice:{ type: GraphQLFloat },
        minPrice:{ type: GraphQLFloat },
        expirationDate:{ type: GraphQLString },
        warranty:{ type: GraphQLString },
    })
});

export default ProductType;