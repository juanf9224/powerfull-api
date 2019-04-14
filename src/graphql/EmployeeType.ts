import { GraphQLObjectType, GraphQLString } from 'graphql';

const EmployeeType = new GraphQLObjectType({    
    name: 'Employee',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        position: { type: GraphQLString }
    })
});

export default EmployeeType;