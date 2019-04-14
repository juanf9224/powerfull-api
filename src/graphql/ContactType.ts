import { GraphQLObjectType, GraphQLString } from 'graphql';

const ContactType = new GraphQLObjectType({    
    name: 'Contact',
    fields: () => ({
        id: { type: GraphQLString },
        phoneNumber: { type: GraphQLString },
        email: { type: GraphQLString },
        address: { type: GraphQLString }
    })
});

export default ContactType;