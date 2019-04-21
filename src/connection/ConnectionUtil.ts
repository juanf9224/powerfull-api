import * as mongoose from 'mongoose';

const user = 'admin';
const pwd = 'admin';
const db = 'test?retryWrites=true';
const url = '@powerfull-api-mongodb-cluster-gbmsd.mongodb.net/';
const connectionString = `mongodb+srv://${user}:${pwd}${url}${db}`;
const connectionStringLocal = 'mongodb://localhost:27017/test';
const ConnectionUtil = {
    mongooseConnect: () => mongoose.connect(connectionString, { useNewUrlParser: true })
                            .catch(err => console.error('could not connect to database: ', err)),
    mongooseConnection: () => mongoose.connection.once('open', () => {
        console.log('Connected to database');
    })
}

export default ConnectionUtil;