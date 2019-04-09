import * as hapi from 'hapi';
import { graphqlHapi, graphiqlHapi } from 'apollo-server-hapi';
import Painting from './models/painting';
import ConnectionUtil from './connection/ConnectionUtil';

/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');

const server: hapi.Server = new hapi.Server({
    port: '4000',
    host: 'localhost'
});

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
                version: '1.0'
            }
        }
    },
    {
        plugin: graphqlHapi,
        options: {
            name: 'graphQl-plugin',
            path: '/graphql',
            graphqlOptions: {
                
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
            graphqlOptions: {
                endpointURL: '/graphql'
            },
            route: {
                cors: true
            }
        }
        
    }
]

const start = async () => {
    server.register(plugins);
    server.route([
        {
            method: 'GET',
            path: 'api/v1/paintings',
            config: {
                description: 'Get all the paintings',
                tags: ['api', 'v1', 'painting']
            },
            handler: (req: any, res: any) => {
                //logic here
                return Painting.find();
            }
        },
        {
            method: 'POST',
            path: '/api/v1/paintings',
            config: {
                description: 'Save new paintings',
                tags: ['api', 'v1', 'painting']
            },
            handler: (req: any, res: any) => {
                const { name, url, technique } = req.payload;
                const painting = new Painting({
                    name,
                    url,
                    technique
                })
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