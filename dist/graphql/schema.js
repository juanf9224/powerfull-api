"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const PaintingType_1 = require("./PaintingType");
const Painting_1 = require("./../models/Painting");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        painting: {
            type: PaintingType_1.default,
            args: { id: { type: graphql_1.GraphQLString } },
            resolve(parent, args) {
                return Painting_1.default.findById(args.id);
            }
        }
    }
});
exports.default = new graphql_1.GraphQLSchema({
    query: RootQuery
});
