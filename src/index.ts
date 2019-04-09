import * as hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import ConnectionUtil from './connection/ConnectionUtil';
import schema from './graphql/schema';
import Painting from './models/painting';
const mongoose = require('mongoose');

/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./../package');

const server: hapi.Server = new hapi.Server({
    port: '4000',
    host: 'localhost'
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
    server.route([
        {
            method: 'GET',
            path: '/api/v1/paintings',
            // config: {
            //     description: 'Get all the paintings',
            //     tags: ['api', 'v1', 'painting']
            // },
            handler: (req: any, res: any) => {
                //logic here
                return Painting.find();
            }
        },
        {
            method: 'POST',
            path: '/api/v1/paintings',
            // config: {
            //     description: 'Save new paintings',
            //     tags: ['api', 'v1', 'painting']
            // },
            handler: (req: any, res: any) => {
                const { name, url, technique } = req.payload;
                let painting = new Painting({
                    name,
                    url,
                    technique
                });
                return painting.save();
            }
        }
    ]);

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

(process as NodeJS.EventEmitter).on('unHandledRejection', (err: any) => {
	if (err) {
		console.log(err);
		process.exit(1);
	}
});

start().catch(err => console.error(`Could not start server: ${err}`));