"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const PaintingType = new graphql_1.GraphQLObjectType({
    name: 'Painting',
    fields: () => ({
        id: { type: graphql_1.GraphQLString },
        name: { type: graphql_1.GraphQLString },
        url: { type: graphql_1.GraphQLString },
        technique: { type: graphql_1.GraphQLString }
    })
});
exports.default = PaintingType;
