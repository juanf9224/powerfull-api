import * as hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import ConnectionUtil from './connection/ConnectionUtil';
import schema from './graphql/schema';
import ApiRoutes from './api/routes';

/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./../package');

// Server parameters
const server: hapi.Server = new hapi.Server({
    port: '5000'
});

// Connect to db
ConnectionUtil.mongooseConnect();
ConnectionUtil.mongooseConnection();

const plugins: hapi.ServerRegisterPluginObject<any>[] = [
    Inert,    
	Vision,
    {
        plugin: HapiSwagger,
        options: {
            info: {
                title: 'Paintings API Documentation',
                version: Pack.version
            }
        }
    },
    {
        plugin: graphqlHapi,
        options: {
            name: 'graphQl-plugin',
            path: '/graphql',
            graphqlOptions: {
                schema
            },
            route: {
                cors: true
            }
        }
        
    },
    {
        plugin: graphiqlHapi,
        options: {
            name: 'graphiQl-plugin',
            path: '/graphiql',
            graphiqlOptions: {
                endpointURL: '/graphql'
            },
            route: {
                cors: true
            }
        }
        
    }
];

const registrationOptions: hapi.ServerRegisterOptions = {
    once: true
};

const start = async () => {
    await server.register(plugins, registrationOptions).catch(err => console.error(`Could not register plugins: ${err}`));
    server.route(ApiRoutes());

    await server.start();
    console.log(`Enviroment is ${process.env.NODE_ENV}`);
    console.log(`Server running at: ${server.info.uri}`);
}

(process as NodeJS.EventEmitter).on('unHandledRejection', (err: any) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
});

start().catch(err => console.error(`Could not start server: ${err}`));