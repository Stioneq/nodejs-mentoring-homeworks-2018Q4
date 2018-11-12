import program from 'commander';
import {
    red
} from 'colors';
import {
    getActions,
    performAction
} from './utils/actions';
import debugModule from 'debug';
const debug = debugModule('app');


if(module.parent){
    module.exports = app;
}else{
    app();
}


function app() {

    function make_red(txt) {
        return red(txt);
    }
    const actions = getActions();
    program.version('0.1.0')
        .option('-a, --action <action>', 'Specify action name: ' +
            actions.join('|'))
        .option('-f, --file <name>', 'Specify file name')
        .option('-f, --path <path>', 'Specify path for bundling')
        .parse(process.argv);

    if (process.argv.length === 2) {
        program.outputHelp(make_red);
    } else {
        if (actions.includes(program.action)) {
            performAction(program.action, program);
        } else {
            debug('action couldn\'t be found');
        }

    }
}