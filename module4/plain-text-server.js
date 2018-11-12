import http from 'http';
import debugModule from 'debug';
const debug = debugModule('server');

http.createServer((req, res) => {
    debug('got request %s', req.url);
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end('Hello world');
}).listen(process.env.PORT || 3000);