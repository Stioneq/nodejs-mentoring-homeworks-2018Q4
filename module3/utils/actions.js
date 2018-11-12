import {
    writeFile,
    transformToUppercase,
    csvToJSON,
    bundleCSS
} from './streams';
import debugModule from 'debug';
const debug = debugModule('app:actions');
const fs = require('fs');

const actions = new Map(
    [
        ['writefile', {
            required: ['file'],
            executor: writeFile
        }],
        ['touppercase', {
            required: [],
            executor: transformToUppercase
        }],
        ['csvtojsontofile', {
            required: ['file'],
            executor: file => csvToJSON(file, fs.createWriteStream(getOutputName(file)))
        }],
        ['csvtojsonstdout', {
            required: ['file'],
            executor: file => csvToJSON(file, process.stdout)
        }],
        ['bundlecss',{
            required: ['path'],
            executor: bundleCSS
        }]
    ]   
);

function getOutputName(file) {
    return file.split('.').slice(0, -1).join('.') + '.json';
}

function getActions() {
    return [...actions.keys()];
}

function performAction(action, args) {
    if (actions.has(action)) {
        const _action = actions.get(action)
        if (_action.required.every(req => req in args)) {
            const fargs = _action.required.map(r => args[r])
            debug('Perform action %s with args: %s', action, fargs);
            _action.executor(...fargs);
        }else{
            debug('Cannot find required arguments: %s', _action.required.filter(req => !(req in args)));
            throw new Error('Cannot find required arguments');
        }
    } else {
        debug('No such action %s', action)
        throw new Error('No such action');
    }
}


module.exports = {
    getActions,
    performAction
}