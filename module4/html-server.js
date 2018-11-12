import debugModule from 'debug';
import {
    createReadStream,
    exists
} from 'fs';
import http from 'http';
import {
    join
} from 'path';
import {
    promisify
} from 'util';
import split2 from 'split2';
import through2 from 'through2';
const debug = debugModule('server');
const pexists = promisify(exists);


const templateDir = './views';
const viewExt = 'html';

/*function getTemplate(name){
    const filePath = join(templateDir, name + '.' + viewExt);
    
    return existsSync(filePath) && readFileSync(join(templateDir, filePath));
}

function interpolate(content, obj){
    
    return content.toString().replace('{}', obj.message);
}*/

async function getTemplate(name) {
    const filePath = join(templateDir, name + '.' + viewExt);

    if (await pexists(filePath)) {

        return createReadStream(filePath);
    }
    throw Error('File not exists');
}

/**
 * Replace all occurrences of keys with values
 * @param {string} input string that should be interpolated
 * @param {*} model object that consists of key that should be interpolated into values
 */
function interpolate(input, model) {
    return input.toString().replace(/\{.+\}/, (match) => {
        const key = match.substring(1, match.length - 1);
        return model[key];
    })
}

/**
 * Creates transform stream that will interpolate whole template
 * @param {object} model object that consists of key that should be interpolated into values
 */
function createInterpolationStream(model) {
    debug('Interpolation started, use model: %s', JSON.stringify(model));
    return through2(function (chunk, enc, callback) {
        interpolate(chunk.toString(), model, (res) => this.push(res));
        this.push(interpolate(chunk.toString(), model));
        callback();
    })
}


http.createServer((req, res) => {
    debug('got request %s', req.url);
    if (req.url === '/') {
        req.url = 'index';
    }
    getTemplate(req.url).then(readStream => {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        readStream
            .pipe(split2())
            .pipe(createInterpolationStream({
                message: 'Hello world'
            }))
            .pipe(res)
    }).catch(() => {
        res.writeHead('404');
        res.end('Cannot retrieve template');
    })
}).listen(process.env.PORT || 3000);