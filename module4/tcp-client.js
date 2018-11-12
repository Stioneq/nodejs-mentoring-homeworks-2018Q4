import {Socket} from 'net';


const client = new Socket();

client.connect(8080, '127.0.0.1', function(){

});
process.stdin.pipe(client);

