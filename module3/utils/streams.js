import fs, {
    createReadStream
} from 'fs';
import through2 from 'through2';
import split2 from 'split2';
import request from 'request';
import {
    promisify
} from 'util';
import debugModule from 'debug';
const debug = debugModule('app:streams');

const BUNDLE_CSS_NAME = 'bundle.css';
const CSS_URL = 'https://www.epam.com/etc/clientlibs/foundation/main.min.fc69c13add6eae57cd247a91c7e26a15.css';

/**
 * Pipe data from the file to the process stdout
 * @param {string | path} filePath path to the file
 */
function writeFile(filePath) {
    debug('Write file %s', filePath);
    createReadStream(filePath).on('end', () => {
        debug('Write finished.')
    }).pipe(process.stdout);
}

/**
 * Transforms data from stdin to stdout by upper-case transformation
 */
function transformToUppercase() {
    debug('Start transforming , waiting for input');
    process.stdin
        .pipe(through2(function (chunk, enc, callback) {
            this.push(chunk.toString().toUpperCase());
            callback();
        }))
        .pipe(process.stdout);
}

/**
 * Converts csv to json. Output json goes to writable stream
 * @param {*} file csv file
 * @param {*} writableStream where to write
 */
function csvToJSON(file, writableStream) {
    debug('Start convertion of csv to json');
    let line = 0;
    const keys = [];
    createReadStream(file)
        .pipe(split2())
        .pipe(through2.obj(function (chunk, enc, callback) {
            const values = chunk.toString().split(',')
            if (!line) {
                keys.push(...values);
                this.push('[');
            } else {
                const value = values
                    .map((val, i) => ({
                        [keys[i]]: val
                    }))
                    .reduce((acc, cur) => ({ ...acc,
                        cur
                    }), {})
                if (line !== 1) {
                    this.push(',');
                }
                this.push(JSON.stringify({
                    value
                }));
            }
            line++;
            callback();
        }, function () {
            this.push(']');
        }))
        .pipe(writableStream);
}

/**
 * Concatenates css files into BUNDLE_CSS
 * @param {*} path 
 */
function bundleCSS(path) {

    debug('bundling start at path %s', path);
    getFiles(path)
        .then(files => {
            return prepareFile(BUNDLE_CSS_NAME).then(() => files);
        })
        .then(
            files => {
                debug('There are %d files with css extension in given folder', files.length);
                [...files.map(f => fs.createReadStream(f)), request(CSS_URL)]
                .forEach((readStream) => {
                    const writeStream = fs.createWriteStream(BUNDLE_CSS_NAME, {
                        'flags': 'a'
                    });

                    readStream.pipe(writeStream);
                });
            }
        )
        .catch(debug);
}


const exists = promisify(fs.exists);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const fsWriteFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

async function getFiles(dir) {

    const dirContent = await readdir(dir);

    const files = await Promise.all(dirContent.map(async file => [file, await stat(file)]));

    return files
        .filter(([file, stat]) => stat.isFile() && file.endsWith('.css'))
        .map(([file]) => file);

}

async function prepareFile(filename) {
    const fileExists = await exists(filename);
    if (fileExists) {
        await unlink(filename);
        await fsWriteFile(filename, '');
    }
}






export {
    writeFile,
    transformToUppercase,
    csvToJSON,
    bundleCSS
};