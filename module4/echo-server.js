import net from 'net';
import debugModule from 'debug';
const debug = debugModule('server');


net.createServer(con => {
    debug('connected from %s', con.localAddress);
    con.pipe(con);
    

}).listen(8080);



