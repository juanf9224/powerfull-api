"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hapi = require("hapi");
const apollo_server_hapi_1 = require("apollo-server-hapi");
const ConnectionUtil_1 = require("./connection/ConnectionUtil");
const schema_1 = require("./graphql/schema");
const painting_1 = require("./models/painting");
/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const server = new hapi.Server({
    port: '4000',
    host: 'localhost'
});
ConnectionUtil_1.default.mongooseConnect();
ConnectionUtil_1.default.mongooseConnection();
const plugins = [
    Inert,
    Vision,
    {
        plugin: HapiSwagger,
        options: {
            info: {
                title: 'Paintings API Documentation',
                version: '1.0'
            }
        }
    },
    {
        plugin: apollo_server_hapi_1.graphqlHapi,
        options: {
            name: 'graphQl-plugin',
            path: '/graphql',
            graphqlOptions: {
                schema: schema_1.default
            },
            route: {
                cors: true
            }
        }
    },
    {
        plugin: apollo_server_hapi_1.graphiqlHapi,
        options: {
            name: 'graphiQl-plugin',
            path: '/graphiql',
            graphqlOptions: {
                endpointURL: '/graphql'
            },
            route: {
                cors: true
            }
        }
    }
];
const registrationOptions = {
    once: true
};
const start = () => __awaiter(this, void 0, void 0, function* () {
    yield server.register(plugins, registrationOptions);
    server.route([
        {
            method: 'GET',
            path: '/api/v1/paintings',
            // config: {
            //     description: 'Get all the paintings',
            //     tags: ['api', 'v1', 'painting']
            // },
            handler: (req, res) => {
                //logic here
                return painting_1.default.find();
            }
        },
        {
            method: 'POST',
            path: '/api/v1/paintings',
            // config: {
            //     description: 'Save new paintings',
            //     tags: ['api', 'v1', 'painting']
            // },
            handler: (req, res) => {
                const { name, url, technique } = req.payload;
                const painting = new painting_1.default({
                    name,
                    url,
                    technique
                });
                return painting.save();
            }
        }
    ]);
    yield server.start();
    console.log(`Server running at: ${server.info.uri}`);
});
process.on('unHandledRejection', (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});
start().catch(err => console.error(`Could not start server: ${err}`));
