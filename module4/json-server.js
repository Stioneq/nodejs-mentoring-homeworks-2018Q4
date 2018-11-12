import http from 'http';
import debugModule from 'debug';
const debug = debugModule('server');

const product = {
    id: 1,
    name: 'Supreme T-Shirt',
    brand: 'Supreme',
    price: 99.99,
    options: [{
        color: 'blue'
    }, {
        size: 'XL'
    }]
}
http.createServer((req, res) => {
    debug('got request %s', req.url);
    res.writeHead(200, {
        'Content-Type': 'application/json'
    });
    res.end(JSON.stringify(product));
}).listen(process.env.PORT || 3000);