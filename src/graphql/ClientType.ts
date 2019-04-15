import { GraphQLObjectType, GraphQLString } from 'graphql';
import ContactType from './ContactType';

const ClientType = new GraphQLObjectType({    
    name: 'Client',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        contact: { type: ContactType }
    })
});

export default ClientType;