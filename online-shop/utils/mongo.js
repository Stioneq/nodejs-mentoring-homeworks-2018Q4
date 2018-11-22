import mongo from 'mongodb';
import debug from 'debug';
const log = debug('server:utils:mongo');

const options = {

    numberOfRetries: 5,
    useNewUrlParser: true,
    auto_reconnect: true,
    poolSize: 40,
    connectTimeoutMS: 500

}
let _client;


mongo.connect('mongodb+srv://admin:qsefthukoroman92@cluster0-fdsjy.mongodb.net/test',
                options
            ,(err, client) => {
            if(err){
                log('fail to connect to the db');
                process.exit(1);
            }    
            log('Connected to mongodb with poolSize=%d', 40);
            _client = client;
        });

export function getDB(dbName) {
    log('Try to get db with name=%s', dbName);
    return _client.db(dbName);
}